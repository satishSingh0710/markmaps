import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import * as d3 from 'd3';

// Initialize the transformer
const transformer = new Transformer();

export function renderMarkmap(markdown: string, container: HTMLElement): Markmap {
  // Clear the container first
  container.innerHTML = '';
  
  // Transform markdown to markmap data
  const { root } = transformer.transform(markdown);
  
  // Pre-expand all nodes in the data structure
  const expandNode = (node: any) => {
    if (!node.state) node.state = {};
    node.state.fold = 0; // 0 means expanded
    if (node.children) {
      node.children.forEach(expandNode);
    }
  };
  expandNode(root);
  
  // Use fixed dimensions instead of trying to read container dimensions
  const width = 1200;
  const height = 800;
  
  // Set up SVG with explicit dimensions
  const svg = d3.select(container)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('style', 'font: 14px sans-serif; user-select: none;');
  
  // Create markmap instance with enhanced options
  const mm = Markmap.create(svg.node()!, {
    autoFit: true,
    color: (node: any) => {
      const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'];
      return colors[node.depth % colors.length];
    },
    duration: 500,
    maxWidth: 350,
    paddingX: 20,
    initialExpandLevel: 999, // Expand all levels by default
  }, root);
  
  // Add custom CSS to make lines more visible
  const styleId = 'markmap-custom-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .markmap-link {
        stroke: #999;
        stroke-width: 1.5px;
        fill: none;
      }
      .markmap-node-circle {
        stroke-width: 1.5px;
      }
      .markmap-node-text {
        fill: currentColor;
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Ensure the markmap is properly sized and positioned
  setTimeout(() => {
    mm.fit();
  }, 300);
  
  return mm;
}

export function updateMarkmap(markmap: Markmap, markdown: string): void {
  // Transform markdown to markmap data
  const { root } = transformer.transform(markdown);
  
  // Update markmap data
  markmap.setData(root);
  markmap.fit();
} 