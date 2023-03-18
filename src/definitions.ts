export interface UdpSocketPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
