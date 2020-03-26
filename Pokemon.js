class Pokemon {
  constructor(hp, name, moves, team_id) {
    this.hp = hp;
    this.name = name;
    this.moves = moves;
    this.team_id = team_id;
  }

  minusHP(num) {
    if (!this.gameHP) {
      this.gameHP = this.hp;
    }
    this.gameHP = this.gameHP - num;
    return this.gameHP;
  }
}
