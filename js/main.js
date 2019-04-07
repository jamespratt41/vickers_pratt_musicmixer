(() => {

    const icons = ['iconOne', 'iconTwo', 'iconThree', 'iconFour'];

    let iconsBox = document.querySelector('#iconHolder'),
        iconSelectors = document.querySelectorAll('#iconButtons img'),
        dropBoxes = document.querySelectorAll('.dropzone'),
        audios = document.querySelectorAll('audio');

    function createIcons(pictureIndex) {

        icons.forEach((icon, index) => {
            let newIcons = `<img draggable id="${icon + pictureIndex}" class="iconsImages" data-iconref="${pictureIndex}" data-musicref="${icon + pictureIndex}" src="images/${icon + pictureIndex}.svg" alt="icon thumbnail">`

            iconsBox.innerHTML += newIcons;
            iconsBox.dataset.iconref = `${pictureIndex}`;
        });

        initDrag();

    }

    function initDrag() {
		iconsBox.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				// e.preventDefault();
				console.log('draggin...')

				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

    function resetAudio() {
        audios.forEach(audio => {
            audio.currentTime = 0;
        });
    }

    dropBoxes.forEach(box => {

        box.addEventListener("dragover", function(e) {
            e.preventDefault();
            console.log('dragging over me');
        });

        box.addEventListener("drop", function(e) {
            e.preventDefault();
            console.log('you dropped it on me');


            let icon = e.dataTransfer.getData("text/plain");
            console.log(icon);
            e.target.appendChild(document.querySelector(`#${icon}`));


            resetAudio();

            audios.forEach(audio => {
                if (audio.dataset.musicref == icon) {
                    audio.play();
                }

            });
        });

        box.addEventListener("click", function(e) {
            console.log('clicked me');

            let image = e.target;
            box.removeChild(image);

            audios.forEach(audio => {
                if (audio.dataset.musicref == image.dataset.musicref) {
                    audio.pause();
                }
            });

            if (image.dataset.iconref == iconsBox.dataset.iconref) {
                iconsBox.appendChild(image);
            }
        });

    });


    function resetIcons() {
        iconsBox.innerHTML = "";
        createIcons(this.dataset.iconref);
    }

    iconSelectors.forEach(iconImage => iconImage.addEventListener('click', resetIcons));

    createIcons(0);





})();
