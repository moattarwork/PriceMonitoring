export class MockConfigService {
  settings = {
    apiUrl: 'ws://localhost:8043',
    favoriteLengthLimit: 2
  };

  getSettings = (name: string) => {
    return this.settings[name];
  }
}
