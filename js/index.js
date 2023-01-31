
let Easting = $("#Easting");
let Northing = $("#Northing");

let lengths;
let DeltaE;
let DeltaN;
let sumE;
let sumN;
let absSumE;
let absSumN;
let corrE;
let corrN;
let correctedE;
let correctedN;
let adjustedLengths;
let correctedEasting;
let correctedNorthing;
let x;
let y;

$("#getInternalAngle").click(function getAnglesSum() {

    getCorrection();
    displayResults();
})

function getCorrection() {
    Easting = Easting.val().split(" ");
    Northing = Northing.val().split(" ");
    lengths = [];
    DeltaE = [];
    DeltaN = [];
    sumE = 0;
    sumN = 0;
    absSumE = 0;
    absSumN = 0;
    for (i = 0; i < Easting.length - 1; i++) {
        lengths.push(Math.sqrt(Easting[i + 1] ** 2 + Northing[i + 1] ** 2));
        DeltaE.push(Easting[i + 1] - Easting[i]);
        DeltaN.push(Northing[i + 1] - Northing[i]);
        sumE += Number(DeltaE[i]);
        sumN += Number(DeltaN[i]);
        absSumE += Math.abs(Number(DeltaE[i]));
        absSumN += Math.abs(Number(DeltaN[i]));

    }

    console.log(lengths);
    console.log(Easting);
    console.log(Northing);
    console.log(sumE);
    console.log(sumN);
    console.log(absSumE);
    console.log(absSumN);

    corrE = DeltaE.map((DeltaE) => - sumE * Math.abs(DeltaE)  / absSumE);
    console.log("correction in E : ");
    console.log(corrE);
    corrN = DeltaN.map((DeltaN) => - sumN * Math.abs(DeltaN) / absSumN);
    console.log("correction in N : ");
    console.log(corrN);

    x = Number(Easting[0]);
    y = Number(Northing[0]);
    correctedE = [];
    correctedN = [];
    adjustedLengths = [];
    correctedEasting = [];
    correctedNorthing = [];
    for (i = 0; i < lengths.length; i++) {
        correctedE.push(corrE[i] + DeltaE[i]);
        correctedN.push(corrN[i] + DeltaN[i]);
        adjustedLengths.push(Math.sqrt(correctedE[i] ** 2 + correctedN[i] ** 2));
        x += correctedE[i];
        y += correctedN[i];
        correctedEasting.push(x);
        correctedNorthing.push(y);
    }

    console.log(correctedE);
    console.log(correctedN);
    console.log(adjustedLengths);
    console.log("---------");
    console.log(correctedEasting);
    console.log(correctedNorthing);
    
}

function displayResults() {
    let hasala = `
<div class=" h5 text-dark border-bottom border-dark border-2 py-3">
<span class="text-dark fw-bold h5">DeltaE --> </span><span class="DeltaE"></span>   </div>
<div class=" h5 text-dark border-bottom border-dark border-2 py-3">
<span class="text-dark fw-bold h5">DeltaN --> </span><span class="DeltaN"></span>  </div>
<div class=" h5 text-dark border-bottom border-dark border-2 py-3">
<span class="text-dark fw-bold h5">CorrectionE --> </span><span class="CorrectionE"></span> </div>
<div class=" h5 text-dark border-bottom border-dark border-2 py-3">
<span class="text-dark fw-bold h5">CorrectionN --> </span><span class="CorrectionN"></span> </div>
<div class=" h5 text-dark border-bottom border-dark border-2 py-3">
<span class="text-dark fw-bold h5">CorrectedLegths --> </span><span class="CorrectedLegths"></span></div>
<div class=" h5 text-dark border-bottom border-dark border-2 py-3">
<span class="text-dark fw-bold h5">CorrectedE --> </span><span class="CorrectedE"></span> </div>
<div class=" h5 text-dark border-bottom border-dark border-2 py-3">
<span class="text-dark fw-bold h5">CorrectedN --> </span><span class="CorrectedN"></span> </div>`;


    let DispDeltaE = ``;
    let DispDeltaN = ``;
    let DispCorrectionE = ``;
    let DispCorrectionN = ``;
    let DispCorrectedLengths = ``;
    let DispcorrectedE = ``;
    let DispcorrectedN = ``;
    for (i = 0; i < DeltaE.length; i++) {
        DispDeltaE += `${Math.round(DeltaE[i] * 1000) /1000} , `;
        DispDeltaN += `${Math.round(DeltaN[i] * 1000) /1000} , `;
        DispCorrectionE += `${Math.round(corrE[i] * 1000) /1000} , `;
        DispCorrectionN += `${Math.round(corrN[i] * 1000) /1000} , `;
        DispCorrectedLengths += `${Math.round(adjustedLengths[i] * 1000) /1000} , `;
        DispcorrectedE += `${Math.round(correctedEasting[i] * 1000) /1000} , `;
        DispcorrectedN += `${Math.round(correctedNorthing[i] * 1000) /1000} , `;
    }

    $("#results").html(hasala);
    $(".DeltaE").html(DispDeltaE);
    $(".DeltaN").html(DispDeltaN);
    $(".CorrectionE").html(DispCorrectionE);
    $(".CorrectionN").html(DispCorrectionN);
    $(".CorrectedLegths").html(DispCorrectedLengths);
    $(".CorrectedE").html(DispcorrectedE);
    $(".CorrectedN").html(DispcorrectedN);
}