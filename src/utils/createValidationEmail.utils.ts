export const createValidationEmail = (
  email: string,
  token: string
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        padding: 0px;
        margin: 0px;
        list-style: none;
      }
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
      }
      header {
        display: flex;
        align-items: center;
        padding: 30px 5px;
        width: 100vw;
        max-width: 600px;
      }
      h1 {
        font-family: Montserrat, inter;
        color: rgb(84, 186, 185);
        cursor: pointer;
      }
      h1 > span {
        color: rgb(68, 131, 130);
      }
      main {
        padding: 30px 5px;
        width: 100vw;
        max-width: 600px;
        font-family: Poppins, sans-serif;
      }
      main > a > button {
        padding: 8px 15px;
        cursor: pointer;
        font-weight: 600;
        font-size: medium;
        border-radius: 13px;
        border-style: none;
        color: rgb(255, 255, 255);
        background-color: rgb(84, 186, 185);
        height: 50px;
        margin-top: 20px;
      }

      main > a > button:hover {
        filter: brightness(1.1);
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Call<span>Mind</span></h1>
    </header>
    <main>
      <h2>Confirme seu endereço de e-mail para começar a usar o CallMind!</h2>
      <p>
        Após sua confirmação de que ${email} é seu endereço de e-mail, você terá
        acesso a todo o ecosistema CallMind.
      </p>
      <a
        href="https://callmindm3.vercel.app/validate-account/${token}"
        target="_blank"
        ><button>Confirmar endereço de email</button></a
      >
    </main>
  </body>
</html>
`;
