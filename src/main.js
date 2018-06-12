import Vue from 'vue'
import Time from './Time.js'
import _ from 'lodash'
import './filters'

let appComponent = Vue.extend({
  template : `
    <div class="container" style="margin-top: 2rem;">
      <div class="row">
        <h1 style="margin-bottom: 2rem;" class="center col-12">Campeonato Brasileiro 2018 - Série A</h1>
        
        <div v-if="view == 'tabela'">
          <button class="btn btn-info" href="#" @click="criaJogo">Novo jogo</button>
        </div>
        <div v-if="view == 'form'">
          <button class="btn btn-info" href="#" @click="verTabela">Ver Tabela do Campeonato</button>
        </div>
        
        <br/><br/>

        <div v-if="view == 'tabela'" class="col-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <td v-for="coluna in colunas">{{coluna | uppercase}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="time in timesFiltered">
                <td>
                  <img :src="time.escudo" :alt="time.nome" style="width: 30px; height: 30px;">
                  {{ time.nome }}
                </td>
                <td> {{ time.pontos }} </td>
                <td> {{ time.gm }} </td>
                <td> {{ time.gs }} </td>
                <td> {{ time | saldo }} </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="col-12" v-if="view == 'form'">
          <form class="form-inline">
            <div class="form-group">
                <input type="text" class="form-control" v-model="novoJogo.casa.gols">
                <label class="control-label">
                    {{ novoJogo.casa.time.nome }} 
                    <img :src="novoJogo.casa.time.escudo" style="height: 30px; width: 30px;"> 
                </label>
            </div>
            <span>X</span>
            <div class="form-group">
                <label class="control-label"> 
                    <img :src="novoJogo.fora.time.escudo" style="height: 30px; width: 30px;">
                    {{ novoJogo.fora.time.nome}} 
                </label>
                <input type="text" class="form-control" v-model="novoJogo.fora.gols">
            </div>
            <button type="button" class="btn btn-primary" @click="fimDeJogo">Fim de jogo</button>
          </form>
        </div>
      </div>
    </div>
  `,
  data() {
    return {

      titulo : "Minha primeira aplicação Vue.js",
      colunas : ['nome', 'pontos', 'gm', 'gs', 'saldo'],
      order : {
        key : [ 'pontos', 'gm', 'gs'],
        sort : ['desc', 'desc', 'asc']
      },  
      times : [
        new Time('Palmeiras',     require('./assets/palmeiras_60x60.png')),
        new Time('Flamengo',      require('./assets/flamengo_60x60.png')),
        new Time('Atlético-MG',   require('./assets/atletico_mg_60x60.png')),
        new Time('Santos',        require('./assets/santos_60x60.png')),
        new Time('Botafogo',      require('./assets/botafogo_60x60.png')),
        new Time('Atlético-PR',   require('./assets/atletico-pr_60x60.png')),
        new Time('Corinthians',   require('./assets/corinthians_60x60.png')),
        new Time('Grêmio',        require('./assets/gremio_60x60.png')),
        new Time('Fluminense',    require('./assets/fluminense_60x60.png')),
        new Time('Ponte Preta',   require('./assets/ponte_preta_60x60.png')),
        new Time('Chapecoense',   require('./assets/chapecoense_60x60.png')),
        new Time('São Paulo',     require('./assets/sao_paulo_60x60.png')),
        new Time('Cruzeiro',      require('./assets/cruzeiro_60x60.png')),
        new Time('Sport',         require('./assets/sport_60x60.png')),
        new Time('Coritiba',      require('./assets/coritiba_60x60.png')),
        new Time('Internacional', require('./assets/internacional_60x60.png')),
        new Time('Vitória',       require('./assets/vitoria_60x60.png')),
        new Time('Figueirense',   require('./assets/figueirense_60x60.png')),
        new Time('Santa Cruz',    require('./assets/santa_cruz_60x60.png')),
        new Time('América-MG',    require('./assets/america_mg_60x60.png')),
      ],
      novoJogo : {
        casa : {
          time : null,
          gols : 0
        },
        fora : {
          time : null,
          gols : 0      
        }
      },
      view : 'tabela'
    }
  },
  computed : {

    timesFiltered(){
      return _.orderBy( this.times, this.order.key, this.order.sort );
    }
  },
  methods : {
    fimDeJogo(){
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;

      this.novoJogo.casa.time.fimDeJogo( timeAdversario, gols, golsAdversario );

      this.showView('tabela');
    },
    criaJogo(){
      this.novoJogo.casa.time = this.times[Math.floor(Math.random() * 20)];
      this.novoJogo.casa.gols = 0;
  
      this.novoJogo.fora.time = this.times[Math.floor(Math.random() * 20)];
      this.novoJogo.fora.gols = 0;

      this.showView('form');
    },
    verTabela(){
      this.showView('tabela');
    },
    showView(view){
      this.view = view;
    }
  }
});

new Vue({
  el: '#app',
  components : {
    'app' : appComponent
  }
})
