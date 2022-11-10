class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList() {
    const { data } = await axios.get(this.BASE_URL + "/characters");
    return data;
  }

  async getOneRegister(id) {
    const { data } = await axios.get(this.BASE_URL + `/characters/${id}`);
    return data;
  }

  async createOneRegister(name, occupation, weapon, cartoon) {
    try {
      console.log(name, occupation, weapon, cartoon);
      if (!name || !occupation || !weapon) {
        return;
      }
      const newCharacter = { name, occupation, weapon, cartoon };
      const { data } = await axios.post(
        this.BASE_URL + "/characters",
        newCharacter
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateOneRegister(id, name, occupation, weapon, cartoon) {
    const updatedCharacter = { id, name, occupation, weapon, cartoon };
    const { data } = await axios.patch(
      this.BASE_URL + `/characters/${id}`,
      updatedCharacter
    );
    return data;
  }

  async deleteOneRegister(id) {
    const { data } = await axios.delete(this.BASE_URL + `/characters/${id}`);
    return true;
  }
}
