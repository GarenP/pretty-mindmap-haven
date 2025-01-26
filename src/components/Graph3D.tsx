import { useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';
import { Note } from '@/lib/generateNotes';
import { useToast } from '@/components/ui/use-toast';

interface Graph3DProps {
  notes: Note[];
  onNodeClick: (note: Note) => void;
}

interface GraphData {
  nodes: any[];
  links: any[];
}

export function Graph3D({ notes, onNodeClick }: Graph3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!containerRef.current) return;

    const graphData: GraphData = {
      nodes: notes.map(note => ({
        id: note.id,
        name: note.title,
        val: note.connections.length,
        color: getNodeColor(note.tags[0]),
        note
      })),
      links: notes.flatMap(note =>
        note.connections.map(targetId => ({
          source: note.id,
          target: targetId,
          color: '#ffffff40'
        }))
      )
    };

    const graphInstance = ForceGraph3D()(containerRef.current)
      .graphData(graphData)
      .nodeLabel('name')
      .nodeColor('color')
      .nodeRelSize(6)
      .linkWidth(1)
      .linkColor('color')
      .onNodeClick(node => {
        onNodeClick(node.note);
        const distance = 40;
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        graphInstance.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
          node,
          3000
        );
      })
      .onNodeHover(node => {
        containerRef.current!.style.cursor = node ? 'pointer' : 'default';
      })
      .backgroundColor('#00000000')
      .showNavInfo(false)
      // Enhanced particle effects
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(2)
      .linkDirectionalParticleSpeed(0.004)
      .linkDirectionalParticleColor(() => '#ffffff')
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      .linkDirectionalParticleResolution(8)
      // Add glow effect to particles
      .nodeThreeObject(node => {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('/glow.png'),
            color: node.color,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
          })
        );
        sprite.scale.set(8, 8, 1);
        return sprite;
      });

    graphRef.current = graphInstance;

    const handleResize = () => {
      graphInstance.width(containerRef.current!.clientWidth);
      graphInstance.height(containerRef.current!.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      graphRef.current = null;
    };
  }, [notes, onNodeClick]);

  return <div ref={containerRef} className="graph-container" />;
}

function getNodeColor(tag: string): string {
  const colors: Record<string, string> = {
    philosophy: '#FF6B6B',
    science: '#4ECDC4',
    history: '#45B7D1',
    art: '#96CEB4',
    literature: '#FFEEAD',
    psychology: '#D4A5A5',
    technology: '#9B59B6',
    mathematics: '#3498DB',
    biology: '#2ECC71',
    physics: '#E74C3C'
  };
  return colors[tag] || '#ffffff';
}