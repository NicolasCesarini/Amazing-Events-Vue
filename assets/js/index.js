const { createApp } = Vue

const app = createApp({
    data(){
        return {
            apiUrl: 'https://mindhub-xj03.onrender.com/api/amazing',
            eventos: [],
            texto: '',
            eventosAMostrar: [],
            categorias: [],
            categoriasSeleccionadas: [],
            
        }
    },
    created(){
        this.obtenerEventos()
    },
    mounted(){

    },
    methods: {
        obtenerEventos() {
            fetch(this.apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.eventos = data.events
                    this.eventosAMostrar = this.eventos
                    this.extraerCategorias(data)
                })
        },
        extraerCategorias(array) {
            array.events.forEach(evento => {
                if (!this.categorias.includes(evento.category) && evento.category) {
                    this.categorias.push(evento.category)
                }
            })
        },
    },
    computed: {
        superFiltro(){
            let primerFiltro = this.eventos.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
            if(!this.categoriasSeleccionadas.length){
                this.eventosAMostrar = primerFiltro
            } else {
                this.eventosAMostrar = primerFiltro.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
            }
        }

        }
}).mount('#app')