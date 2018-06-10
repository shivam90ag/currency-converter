
export interface Socket {
    onMessage(event: string, callback: (data: any) => void );
    send(event: string, data: any);
  }