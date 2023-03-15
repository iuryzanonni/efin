import Button from "../components/button";
import CardInvoice from "../components/cardInvoice";

export default function Home() {
  return (
    <div>
      <Button
        text="Adicionar fatura"
        onclick={() => {
          console.log("Teste Adicionar Fatura");
        }}
      />
      <CardInvoice
        name="Fatura 1"
        value={200.23}
        onClickCheck={() => {
          console.log("Teste Check");
        }}
        onClickDelete={() => {
          console.log("Teste Delete");
        }}
      />
      <Button
        text="Listar fatura"
        onclick={() => {
          console.log("Teste Listar Fatura");
        }}
        backgroundColor="#002C83"
      />
    </div>
  );
}
