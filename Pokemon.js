class Pokemon {
  constructor(hp, name, moves) {
    this.hp = hp;
    this.name = name;
    this.moves = moves;
  }

  attack(num) {
    if (!this.gameHP) {
      this.gameHP = this.hp;
    }
    this.gameHP = this.gameHP - num;
    return this.gameHP;
  }
}
