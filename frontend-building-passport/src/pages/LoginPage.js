import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const textFieldStyle = {
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
      backgroundColor: "#00000050",
      color: "#000",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
};

export default function LoginPage() {
  return (
    <LoginContainer>
      <h1>Building Passport</h1>
      <StyledForm>
        <TextField
          name="email"
          sx={{ marginTop: "10px" }}
          label="E-mail"
          type="email"
          variant="outlined"
        />
        <TextField
          name="password"
          sx={{ marginTop: "10px" }}
          label="Senha"
          type="password"
          variant="outlined"
        />
        <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">
          Entrar
        </Button>
        <StyledLink to="/sign-up">Não possui cadastro?</StyledLink>
      </StyledForm>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)``;
