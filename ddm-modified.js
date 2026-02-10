class Example extends HTMLElement {  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
        <button id="modified">Send MODIFIED event</button>
        <button id="unmodified">Send UNMODIFIED event</button>
        `
  }

  async initialise(args) {
    console.log("`cgp-example` is initialised with", args)
    const { eventManager, context } = args

    this.shadowRoot.getElementById("modified").addEventListener("click", () => {
      eventManager.publish({
        type: "cgp:plugin:state:updated",
        data: {
          "modified": true
        }
      })
    })

    this.shadowRoot.getElementById("unmodified").addEventListener("click", () => {
      eventManager.publish({
        type: "cgp:plugin:state:updated",
        data: {
          "modified": false
        }
      })
    })
  }

  async getState() {
    return {
      modified: Date.now() % 2 === 0
    }
  }

  disconnectedCallback() {
    console.log("`cgp-example` is destroyed!")
  }
}

if (!window.customElements.get("cgp-example")) {
  customElements.define("cgp-example", Example)
}
