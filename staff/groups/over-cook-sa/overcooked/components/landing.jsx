const { Component } = React

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      view: 'landing',
      mealRandom: null,
      credentials: undefined,
      user: undefined,
      error: undefined
    }

    this.onRandomRecipe = this.onRandomRecipe.bind(this)
    this.handleGoToLogin = this.handleGoToLogin.bind(this)
    this.handleGoToRegister = this.handleGoToRegister.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleAcceptError = this.handleAcceptError.bind(this)
  }

  componentWillMount() {
    this.onRandomRecipe()

    const {
      props: { credentials }
    } = this

    if (credentials) {
      const { id, token } = credentials

      try {
        logic
          .retrieveUser(id, token)
          .then(user => this.setState({ user }))
          .catch(({ message }) => this.setState({ error: message }))
      } catch ({ message }) {
        this.setState({ error: message })
      }
    }
  }

  onRandomRecipe = () => {

    logic.retrieveRandomRecipe()
      .then(meal => {
        const { strYoutube: youtube } = meal
        meal.strYoutube = youtubeParse(youtube)
        //console.log(meal)
        this.setState({ mealRandom: meal })

      })

  }

  handleAcceptError() {
    this.setState({ error: undefined })
  }

  handleRegister(name, surname, email, password, repassword) {
    try {
      logic
        .registerUser(name, surname, email, password, repassword)
        .then(() => this.setState({ view: 'register-success' }))
        .catch(({ message }) => this.setState({ error: message }))
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleLogin(email, password) {
    try {
      logic
        .authenticateUser(email, password)
        .then(credentials => {this.setState({ credentials })
          this.props.onCredentials(credentials)
          sessionStorage.id = credentials.id
          sessionStorage.token = credentials.token
        })
      
        .catch(({ message }) => this.setState({ error: message }))
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleGoToRegister() {
    this.setState({ view: 'register', mealRandom: null, error: undefined })
  }

  handleGoToLogin() {
    this.setState({ view: 'login', mealRandom: null, error: undefined })
  }

  handleGoBack() {
    this.setState({ view: 'landing', error: undefined })
  }

  render() {
    const {
      state: { view, mealRandom, error },
      handleGoToLogin,
      handleGoToRegister,
      handleRegister,
      handleLogin,
      handleGoBack,
      handleAcceptError
    } = this

    return (
      <>
        <header >
          <BigHeader />
        </header>

        <main className="back-img">
          <section>
            {view === 'register' && (<Register onRegister={handleRegister} onBack={handleGoBack} error={error} /> )}
            {view === 'landing' && (<WelcomeAnchors onRegister={handleGoToRegister} onLogin={handleGoToLogin} /> )}
            {view === 'login' && (<Login onLogin={handleLogin} onBack={handleGoBack} error={error} />} )}
            {view === 'register-success' && (<RegisterSuccess onLogin={handleGoToLogin} />)}
          </section>
          <section className="random-recipe"> {mealRandom && <RecipeItem meal={mealRandom} />} </section>

        </main>
     
      </>
    )
  }
}
