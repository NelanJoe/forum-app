/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert (toast) when name is empty
 *   - should display alert (toast) when email is empty
 *   - should display alert (toast) when password is empty
 *   - should display loginpage when name, email and password are correct
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    // Memverifikasi element yang harus tampak pada halaman login
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });

  it('should display alert / toast when name is empty', () => {
    // klik tombol register tanpa mengisi name
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi toast.error untuk menampilkan pesan dari API
    cy.on('toast.error', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert / toast when email is empty', () => {
    // mengisi username
    cy.get('input[placeholder="Name"]').type('testusername');

    // klik tombol register tanpa mengisi email
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi toast.error untuk menampilkan pesan dari API
    cy.on('toast.error', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert / toast when password is empty', () => {
    // mengisi name & email
    cy.get('input[placeholder="Name"]').type('testusername');
    cy.get('input[placeholder="Email"]').type('budi20@gmail.com');

    // klik tombol register tanpa mengisi password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi toast.error untuk menampilkan pesan dari API
    cy.on('toast.error', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display loginpage when name, email and password are correct', () => {
    const UniqueNumber = `${Math.floor(Math.random() * 10000000000000)}`;

    // mengisi name, email & password
    cy.get('input[placeholder="Name"]').type(`random${UniqueNumber}`);
    cy.get('input[placeholder="Email"]').type(`random${UniqueNumber}@gmail.com`);
    cy.get('input[placeholder="Password"]').type('123456');

    // klik tombol register tanpa mengisi password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi toast.success untuk menampilkan pesan dari API
    cy.on('toast.success', (str) => {
      expect(str).to.equal('Successfully register new user');
    });

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('h2')
      .contains(/^ForumApp$/)
      .should('be.visible');

    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });
});
