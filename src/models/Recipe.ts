class Recipe {
  private title: string;
  private link: string;
  private ingredients: Array<string>;
  private gif: string;

  constructor(title: string, link: string, ingredients: Array<string>) {
    this.title = title;
    this.link = link;
    this.ingredients = ingredients.sort();
    this.gif = "";
  }

  getTitle() {
    return this.title;
  }

  addGif(gifUrl: string) {
    this.gif = gifUrl;
    return this;
  }

  toObject() {
    return {
      title: this.title,
      ingredients: this.ingredients,
      link: this.link,
      gif: this.gif,
    };
  }
}

export default Recipe;
