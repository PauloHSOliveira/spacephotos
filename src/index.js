import axios from 'axios';

class App {
    constructor() {
        this.photosNasa = [];

        this.classesection = document.getElementById('secao');
        this.form = document.getElementById('buscaForm');
        this.inpuEl = document.querySelector('input[name=mesSpace]');

        this.addPhotosAtual();

        this.registerMes();
    }

    registerMes() {
        this.form.onsubmit = event => this.verifyInput(event);
    }

    addPhotosAtual() {
        const dataAtual = new Date();
        this.addPhotos(dataAtual.getMonth().toString(),dataAtual.getFullYear().toString());
        console.log(dataAtual.getMonth())
    }

    verifyInput(event) {
        event.preventDefault();
        const data = new Date();

        const inputText = this.inpuEl.value;
        const inputArray = inputText.split("")

        const mes = this.inpuEl.value.length === 0? data.getMonth().toString():`${inputArray[0]}${inputArray[1]}`;
        const ano = this.inpuEl.value.length === 0? data.getFullYear().toString():`${inputArray[3]}${inputArray[4]}${inputArray[5]}${inputArray[6]}`

        console.log(mes,ano)
        this.addPhotos(mes,ano)
    }

    async addPhotos(mes,ano) {
        var dia = 1;
        var datamax = 32;

        this.classesection.innerHTML = '';
        while (dia <= datamax) {
            this.photosNasa = [];

            var diaform = dia <= 9 ? '0' + dia.toString() : dia.toString();
            let dateFormt = `${ano}-${mes}-${diaform}`
            try {
                let link = 'https://api.nasa.gov/planetary/apod?api_key=7dfNpX7YU51fptt695iUnD33Ls5tk0lLtjXWATa0';
                const response = await axios.get(link + `&date=${dateFormt}`);
                const { url, date, title, media_type } = response.data;

                this.photosNasa.push({
                    url,
                    date,
                    title,
                    media_type
                });

                this.renderPhotos(media_type);
                dia++;
            } catch (err) {
                console.log('Todas as fotos carregadas')
                break;
            }
        }

    }
    renderPhotos(typeMedia) {

        this.photosNasa.forEach(nasaPhotos => {

            const element = typeMedia === 'image' ? 'img' : 'iframe';

            const mediaItem = document.createElement(element);
            mediaItem.setAttribute('src', nasaPhotos.url);

            let texteItem = document.createElement('strong');
            texteItem.appendChild(document.createTextNode(nasaPhotos.title));

            let dataItem = document.createElement('h4');
            dataItem.appendChild(document.createTextNode(nasaPhotos.date));


            let divItem = document.createElement('div');

            divItem.appendChild(mediaItem);
            divItem.appendChild(texteItem);
            divItem.appendChild(dataItem);

            this.classesection.appendChild(divItem);
        });
    }
}

new App();