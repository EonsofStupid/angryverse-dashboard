export interface SynapticAnimations {
  connection_speed: number[];
  pulse_frequency: number[];
  node_sizes: string[];
  connection_colors: string[];
}

export interface DataFlow {
  particle_speed: number[];
  particle_size: string[];
  flow_patterns: string[];
  density: number[];
}

export interface NeuralTokens {
  synaptic_animations: SynapticAnimations;
  data_flow: DataFlow;
}