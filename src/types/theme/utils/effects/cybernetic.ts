export interface CircuitTraces {
  line_width: string[];
  glow_intensity: number[];
  pattern_complexity: string[];
  animation_speed: string[];
}

export interface EnergyFlow {
  pulse_speed: number[];
  color_schemes: string[][];
  flow_intensity: number[];
}

export interface ScanEffects {
  scan_speed: string[];
  scan_color: string[];
  scan_width: string[];
  scan_blur: string[];
}

export interface CyberneticTokens {
  circuit_traces: CircuitTraces;
  energy_flow: EnergyFlow;
  scan_effects: ScanEffects;
}