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
  
    const content = this.shadowRoot.getElementById("inner-html");
    content.innerHTML = `
      <div>The plugin has been initialized with</div>
      <div>=========</div>
      <pre>${JSON.stringify(context, null, 2)}</pre>
    `

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

  disconnectedCallback() {
    console.log("`cgp-example` is destroyed!")
  }
}

if (!window.customElements.get("cgp-example")) {
  customElements.define("cgp-example", Example)
}
