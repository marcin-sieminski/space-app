export class Pilot {
  static defaultImageUrl = '/assets/unknown-pilot.jpg';

  firstName = '';
  lastName = '';
  imageUrl = '';

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value: string) {
    const values = value.split(' ');
    this.firstName = values[0];
    this.lastName = values[1];
  }

  constructor(fullName: string, imageUrl = Pilot.defaultImageUrl) {
    this.fullName = fullName;
    this.imageUrl = imageUrl;
  }
}
