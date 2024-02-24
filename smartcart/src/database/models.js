export class Item {
  constructor(name, id = "") {
    this.name = name;
    this.id = id;
  }

  to_dict() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  to_dict_no_id() {
    return {
      name: this.name,
    };
  }
}
