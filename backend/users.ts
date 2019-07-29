  export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  matches(another: User) {
    return (
      another &&
      another.email === this.email &&
      another.password === this.password
    )
  }
}

export const users: {[key: string]: User} = {
  'juliana@gmail.com': new User('Juliana', 'juliana@gmail.com', 'juju1234'),
  'amanda@gmail.com': new User('Amanda', 'amanda@gmail.com', 'juju1234')
}
