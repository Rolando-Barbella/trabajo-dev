import Container from "@mui/material/Container";
import Head from "next/head";

function Contact() {
  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 55 }}>
      <Head>
        <title>Contact detalis - Junior Dev Jobs Board </title>
        <meta
          name="description"
          content="Contact junior dev board anytime"
        />
      </Head>
      <div className="text-center grid place-items-center pt-10 text-lg text-light">
        <div>
          <p>We are a small team ( nah, is just one person ) helping junior dev get the right oportunities.</p>
          <div className="pt-2">
            <p>Any questions or queries, please feel free to text at:</p>
            <p className="text-blue-400">juniordevelopersjobs@gmail.com</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Contact;
