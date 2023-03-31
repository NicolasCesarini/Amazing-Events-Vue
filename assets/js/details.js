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
            id: 0,
            
            
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
                    this.date = data.currentDate
                    /* this.extraerCategorias(data) */
                    const querySearch = document.location.search
                    const id = new URLSearchParams(querySearch).get("id")
                    this.eventosAMostrar = data.events.find(event => event._id == id)
                })
        },
    },
    computed: {
        details(){
        this.querySearch = data.events.find(evento => evento._id == id)
        this.id = document.getElementById("details")
        
}

        }
}).mount('#app')






