/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert (toast) when email is empty
 *   - should display alert (toast) when password is empty
 *   - should display alert (toast) when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display login page correctly', () => {
    // Memverifikasi element yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert (toast) when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi toast.error untuk menampilkan pesan dari API
    cy.on('toast.error', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert (toast) when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('budi17@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi toast.error untuk menampilkan pesan dari API
    cy.on('toast.error', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('budi17@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('salah');

    // menekan tombol login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi toast.error untuk menampilkan pesan dari API
    cy.on('toast.error', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('budi17@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('123456');

    // menekan tombol login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi toast.success untuk menampilkan pesan dari API
    cy.on('toast.success', (str) => {
      expect(str).to.equal('Successfully login');
    });

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('h2')
      .contains(/^ForumApp$/)
      .should('be.visible');
  });
});
