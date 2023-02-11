import Container from "@mui/material/Container";


function Contact() {
  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 37 }}>
      <div className="text-center grid place-items-center pt-10">
        <div>
          <p className="text-light">We are a small team ( nah, is just one person ) helping junior dev get the right oportunities</p>
          <p>Any questions or queries, please feel free to text me at:</p>
          <p className="text-blue-400">juniordevelopersjobs@gmail.com</p>
        </div>
      </div>
    </Container>
  );
}

export default Contact;
