module.exports = {

  get_new_castration(periodo_castracao, data, castrations) {
    /*
      periodo_castracao: String ("manhã" ou "tarde")
      data: String (formato "AAAA-MM-DD")
      castrations: Array (objetos que já existem no banco ordenados por atendimento)
    */
    var result_obj = {};      // armazenará o objeto final
    var cont = 1;             // será utilizado para definir qual o horário do atendimento
    var atendimento = null;   // número de atendimento
    var new_date = `${data} `;// armazenará a nova data gerada após o switch case

    if (castrations.length == 0) { 
      // se o array estiver vazio será o primeiro atendimento
      atendimento = 1;
    } else {
      // se o array tiver elementos ele vai iterar
      castrations.forEach((element, index) => {
        if (element.atendimento == cont) {
          /*
            se o atendimento for igual ao contador incrementa o cont para 
            indicar que o atendimento deverá ser o próximo
          */
          cont += 1;
        } else {
          /* 
            se o atendimento não for igual ao cont, isso indica que é um horário 
            vago, como as castrações estão ordenadas por atendimento o if vai
            indicar o atendimento correto
          */
          if (atendimento == null) {
            // garante que atendimento seja preenchido uma única vez
            atendimento = cont;
          }
        }
      });
      if (atendimento == null) {
        /*
          se o array tiver um único elemento ele não entraria no else da primeira
          iteração, esse if adicional garante que o atendimento seja preenchido
          com o valor do cont que foi incrementado na primeira iteração
        */
        atendimento = cont;
      }
    }

    switch (atendimento) { // o número do atendimento define a hora da castração
      case 1:
        new_date += periodo_castracao == "manhã" ? "08:00:00" : "13:00:00"
        break;
      case 2:
        new_date += periodo_castracao == "manhã" ? "08:20:00" : "13:20:00"
        break;
      case 3:
        new_date += periodo_castracao == "manhã" ? "08:40:00" : "13:40:00"
        break;
      case 4:
        new_date += periodo_castracao == "manhã" ? "09:00:00" : "14:00:00"
        break;
      case 5:
        new_date += periodo_castracao == "manhã" ? "09:20:00" : "14:20:00"
        break;
      case 6:
        new_date += periodo_castracao == "manhã" ? "09:40:00" : "14:40:00"
        break;
      case 7:
        new_date += periodo_castracao == "manhã" ? "10:00:00" : "15:00:00"
        break;
      case 8:
        new_date += periodo_castracao == "manhã" ? "10:20:00" : "15:20:00"
        break;
      case 9:
        new_date += periodo_castracao == "manhã" ? "10:40:00" : "15:40:00"
        break;
      case 10:
        new_date += periodo_castracao == "manhã" ? "11:00:00" : "16:00:00"
        break;
    }

    // montando objeto final
    result_obj = { 
      data: new_date, 
      periodo_castracao, 
      atendimento 
    }
    
    return result_obj;
  }
}