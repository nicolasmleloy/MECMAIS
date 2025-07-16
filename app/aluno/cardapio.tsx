import React, { useState } from 'react';
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";

export default function CardapioAlunoPais() {
  const [diasSemana] = useState([
    'Segunda-feira',
    'Terça-feira', 
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira'
  ]);

  const [cardapioSemana, setCardapioSemana] = useState({
    'Segunda-feira': 'Arroz com carne',
    'Terça-feira': 'xuxu com batata',
    'Quarta-feira': 'molinho com molho',
    'Quinta-feira': 'pudim',
    'Sexta-feira': 'suco de maracuja com bolacha vitarella '
  });

  const handleDiaPress = (dia) => {
    // Aqui você pode implementar a lógica para mostrar o cardápio do dia
    console.log('Dia selecionado:', dia);
  };

  return (
    <div className="flex-1 bg-white">
      <Header tipo="semPerfil"/>
      
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Cardápio da semana
        </h1>
        
        {/* Lista de dias da semana */}
        <div className="space-y-3">
          {diasSemana.map((dia, index) => (
            <button
              key={index}
              className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:bg-blue-100 transition-colors"
              onClick={() => handleDiaPress(dia)}
            >
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <div className="text-lg font-medium text-gray-700">
                    {dia}
                  </div>
                  {cardapioSemana[dia] && (
                    <div className="text-sm text-gray-600 mt-1">
                      {cardapioSemana[dia]}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Espaçamento inferior para o footer */}
        <div className="h-20" />
      </div>
      
      <FooterOpcoes perfil="aluno" pagina='cardapio'/>
    </div>
  );
}