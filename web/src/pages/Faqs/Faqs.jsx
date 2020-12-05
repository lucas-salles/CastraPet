import React from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
import Header from '../../components/Header'
import './faqs.css'

const Faqs = () => {
    return (
        <>
            <Header titulo="Perguntas Frequentes"/>
            <div className="accordion">
                <Accordion>
                    <AccordionItem title="O que fazemos?">
                        <p>
                            Cuidamos dos pets...
                        </p>
                    </AccordionItem>
                    <AccordionItem title="O que fazemos?">
                        <p>
                            Cuidamos dos pets...
                        </p>
                    </AccordionItem>
                    <AccordionItem title="O que fazemos?">
                        <p>
                            Cuidamos dos pets...
                        </p>
                    </AccordionItem>
                    <AccordionItem title="O que fazemos?">
                        <p>
                            Cuidamos dos pets...
                        </p>
                    </AccordionItem>
                </Accordion> 
            </div>
        </>
    );
};

export default Faqs;