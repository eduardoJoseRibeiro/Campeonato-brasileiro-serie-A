export default class Time {

    constructor( nome, escudo ){

        this.nome = nome;
        this.escudo = escudo;

        this.pontos = 0;
        this.gm = 0;
        this.gs = 0;
    }

    updateInfo(pontos, gols, golsSofridos){
        
        this.pontos += pontos;
        this.gm += gols;
        this.gs = golsSofridos; 
    }

    fimDeJogo(timeAdversario, golsMarcados, golsSofridos){

        if( golsMarcados == golsSofridos ){

            this.updateInfo( 1, golsMarcados, golsSofridos );
            timeAdversario.updateInfo( 1, golsSofridos, golsMarcados );
        }else if( golsMarcados > golsSofridos ){

            this.updateInfo( 3, golsMarcados, golsSofridos );
            timeAdversario.updateInfo( 0, golsSofridos, golsMarcados );
        }else{

            this.updateInfo( 0, golsMarcados, golsSofridos );
            timeAdversario.updateInfo( 3, golsSofridos, golsMarcados );
        }

    }
}