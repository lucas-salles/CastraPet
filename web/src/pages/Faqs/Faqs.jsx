import React from "react";
import { Accordion, AccordionItem } from "react-light-accordion";
import "react-light-accordion/demo/css/index.css";
import Header from "../../components/Header";
import "./faqs.css";

const Faqs = () => {
  return (
    <>
      <Header titulo="Perguntas Frequentes" />

      <div id="page-faq" className="container">
        <div className="accordion">
          <Accordion>
            <AccordionItem title="Por que a castração é tão importante?">
              <p>Em primeiro lugar, para evitar que nasçam possíveis vítimas do abandono humano. 
                As superpopulações de cães e gatos contribuem, por sua vez, para o alastramento de epidemias como raiva e leishmaniose, a maior zoonose do país 
              </p>
            </AccordionItem>
            <AccordionItem title="Existe idade certa para fazer?">
              <p>A castração em animais jovens é mais tranquila e rápida do que nos adultos. 
                O tamanho e o peso corporal são menores, o que facilita o trabalho dos veterinários. 
                Também fica mais fácil visualizar os testículos e os ovários, diminuindo o sangramento e o tamanho das incisões.  
                No caso dos felinos, pode ser feita depois dos 6 meses, quando eles já têm um porte físico mais desenvolvido.
                O procedimento também pode ser realizado em cães com até 1 ano de vida, dependendo do porte do animal.
                Raças menores, por exemplo, atingem a maturidade sexual por volta dos 8 meses; as maiores, aos 12 ou 14 meses. 
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Faqs;
