import { useEffect, useState } from "react";
import styled from "styled-components";
import GuestHeader from "../components/GuestHeader";

export default function QRCodePage() {
  const [image, setImage] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const imageSource = url
      .split("?src=")[1]
      .replace(/%3A/g, ":")
      .replace(/%2F/g, "/")
      .replace(/%3B/g, ";")
      .replace(/%2C/g, ",")
      .replace(/%3D/g, "=")
      .replace(/%20/g, "+");
    setImage(imageSource);
  }, []);
  return (
    <QRCodeContainer>
      <GuestHeader />
      <img className="qrcode" src={image} alt="qrcode" />
      <h1>
        Sua presença já foi confirmada! Utilize o <span>QRCode</span> acima para
        acesso ao condomínio no dia do evento!
      </h1>
      <h2>Um e-mail foi enviado com o link para acesso a este QRCode.</h2>
    </QRCodeContainer>
  );
}

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15%;

  .qrcode {
    margin-top: 100px;
    height: 300px;
  }

  h1 {
    font-size: 24px;
    line-height: 30px;
    text-align: justify;
    margin-top: 15px;
  }

  h2 {
    font-size: 18px;
    line-height: 24px;
    text-align: justify;
    margin-top: 10px;
  }

  span {
    font-weight: bold;
  }
`;
