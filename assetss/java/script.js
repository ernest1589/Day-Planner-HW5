import moment from "https://cdn.skypack.dev/moment@2.29.1";

var store = window.localStorage;

var container = $(".container");

var now = moment();

var currentTime = { text: moment().format("h.00 A"), hour: moment().hour() };

$("#day").text(now.format("dddd MMMM DD, YYYY"));

var range= (start, end, step) => {
    return Array.from(
        Array.from(Array(Math.ceil((end - start) / step)).keys()),
        (x) => start + x * step
    );
};

var hoursOfTheDay = Array.from(new
Array(24)).map((v,i) => {
    var text = moment().hour(i).format("h:00 A");
    var hour = moment().hour(i);
    return { text, hour};
});

function color(time) {
    return time.text === currentTime.text
    ? "bg-gray300"
    : time.hour < now
    ? "bg-gray-300"
    : "bg-green-200";
}

hoursOfTheDay.forEach((hr) => {
    var grid = $(
        `<form date-name="${hr.text}" class="gris gris-cols-12 border-gray-500 "></form>.`
    );

    var time = $(
        `<div class="flex items-center justify-center col-span-2 h-16">${hr.text}</div>`
    );

    var textArea = $(
        `<textarea name="${
            hr.text
        }" maxLenght="50" style="resize: none; overflow:
        hidden;" class="col-span-8 h-16 p-6 ${color(
            hr
        )}">${store.getItem(hr.text) || ""}</textarea>`
    );

    textArea.keydown((e) => {
      if(e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        return false;
      }        
    });

    const saveButton = $(
        `<button type="submit" class="col-span-2 h-16 bg-indigo-500 text-white 
        font-bold hover:bg-indigo-400 transition duration-500 ease-in-out">
        <i class=" fas fa-save text-xl"></i></button>`
        );

        grid.submit((e) => {
            e.preventDefault();

            var value =
    $(`textarea[name="${hr.text}"]`).val();
            
        store.setItem(hr.text, value);
        });

        grid.append(time);
        grid.append(textArea);
        grid.append(saveButton);

        container.append(grid);
});
