import { useEffect, useState } from "react";
import styled from "styled-components";
import GuestHeader from "../components/GuestHeader";

export default function QRCodePage() {
  const [image, setImage] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const imageSource = url.split("?src=")[1];
    setImage(imageSource);
  }, []);
  return (
    <QRCodeContainer>
      <GuestHeader />
      <img src={image} alt="qrcode" />
      <h1>
        Sua presença já foi confirmada! Utilize o QRCode acima para acesso!
      </h1>
      <h2>Um e-mail foi enviado com o link para acesso a este QRCode.</h2>
    </QRCodeContainer>
  );
}

const QRCodeContainer = styled.div`
  img {
    margin-top: 100px;
  }
`;
