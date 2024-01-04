import IdeaApi from "../services/ideaApi"
import IdeaList from "./IdeaList"

class IdeaForm {
  constructor() {
    this._ideaList = new IdeaList()
    this._formModal = document.querySelector("#form-modal")
  }
  addEventListeners() {
    this._ideaForm.addEventListener("submit", this.handleSubmit.bind(this))
  }

  async handleSubmit(e) {
    e.preventDefault()

    if (
      !this._ideaForm.elements.text.value ||
      !this._ideaForm.elements.tag.value ||
      !this._ideaForm.elements.username.value
    ) {
      alert("Please enter all fields!!!")
      return
    }

    localStorage.setItem("username", this._ideaForm.elements.username.value)

    const idea = {
      text: this._ideaForm.elements.text.value,
      tag: this._ideaForm.elements.tag.value,
      username: this._ideaForm.elements.username.value,
    }
    // Add idea to server
    const newIdea = await IdeaApi.createIdea(idea)

    // Add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data)

    this._ideaForm.elements.text.value = ""
    this._ideaForm.elements.tag.value = ""
    this._ideaForm.elements.username.value = ""

    this.render()

    document.dispatchEvent(new Event("closemodal"))
  }

  render() {
    this._formModal.innerHTML = `
  <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${
              localStorage.getItem("username")
                ? localStorage.getItem("username")
                : ""
            }" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
  `
    this._ideaForm = document.querySelector("#idea-form")
    this.addEventListeners()
  }
}
export default IdeaForm
