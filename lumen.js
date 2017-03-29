var volAir;

function ukuranTank() {
	var panjang = $("#panjang").val();
   	var lebar = $("#lebar").val();
   	var tinggi = $("#tinggi").val();
   	var substrate = $('#substrate').val();
   	if (panjang != "" && lebar != "" && tinggi != "" && substrate != "") {
		var volume = (panjang*lebar*tinggi)/1000;
		var volSubstrate = (panjang * lebar * substrate)/1000;
		var amazonia = (volSubstrate/9).toFixed(2);
		var malang = (volSubstrate*0.6).toFixed(2);
		var silika = (volSubstrate*1.2).toFixed(2);
		volAir = (panjang * lebar * (tinggi - substrate))/1000;
		$("#volume").text(volume+" liter");
		$("#volair").text(volAir+" liter");
		$("#filmin").text(volume*5+" l/h");
		$("#filmax").text(volume*10+" l/h");
		$("#volSubstrate").text(volSubstrate +" liter");
		$("#amazonia").html("&plusmn; "+pecahan(amazonia) +" kantong");
		$("#malang").html("&plusmn; "+ pecahan(malang) +" kg");
		$("#silika").html("&plusmn; "+ pecahan(silika) +" kg");
	}
}

function hitungLed () {
	var putih1Watt = ($("#led1WattPutih").val() != '') ? $("#led1WattPutih").val() : 0;
	var merah1Watt = ($("#led1WattMerah").val() != '') ? $("#led1WattMerah").val() : 0;
	var biru1Watt = ($("#led1WattBiru").val() != '') ? $("#led1WattBiru").val() : 0;
	var putih3Watt = ($("#led3WattPutih").val() != '') ? $("#led3WattPutih").val() : 0;
	var merah3Watt = ($("#led3WattMerah").val() != '') ? $("#led3WattMerah").val() : 0;
	var biru3Watt = ($("#led3WattBiru").val() != '') ? $("#led3WattBiru").val() : 0;
	var lumen = (putih1Watt*110)+(merah1Watt*45)+(biru1Watt*25)+(putih3Watt*200)+(merah3Watt*90)+(biru3Watt*40);
	var lumenLiter = lumen / volAir;
	var kategori;

	if (lumenLiter>=15 && lumenLiter<=25) {
		kategori = "Low Light";
	}
	else if (lumenLiter>25 && lumenLiter<=50) {
		kategori = "Medium Light";
	}
	else if (lumenLiter>50) {
		kategori = "High Light";
	}
	else {
		kategori = "Cahaya Tidak Cukup!";
	}

	$("#kategori").text(kategori);
}

function rekomendasiLed() {
	$("#rekomHigh").text(Math.ceil(volAir*51/110)+" Watt");
	$("#rekomMedium").text(Math.ceil(volAir*26/110)+" Watt");
	$("#rekomLow").text(Math.ceil(volAir*16/110)+" Watt");
	$("#ketRekom").text('(bila menggunakan LED putih 1 Watt)');
}

function hitungBukanLed() {
	var daya = ($("#daya").val() != '') ? $("#daya").val() : 0;
	var wattLiter = daya / volAir;
	var kategori;

	if(wattLiter < 0.6) {
		kategori = "Low Light";
	} else if(wattLiter >= 0.6 && wattLiter <= 1) {
		kategori = "Medium Light";
	} else if(wattLiter > 1) {
		kategori = "High Light";
	} else {
		kategori = "Cahaya Tidak Cukup!";
	}
	$("#kategori").text(kategori);
}

function rekomendasiBukanLed() {
	$("#rekomHigh").text(Math.ceil(volAir*1)+" Watt");
	$("#rekomMedium").text(Math.ceil(volAir*0.8)+" Watt");
	$("#rekomLow").text(Math.ceil(volAir*0.5)+" Watt");
	$("#ketRekom").text('');
}

function pecahan(angka) {
	var p = angka.toString().split(".");
	var bulat = parseFloat(p[0]);
	var pecahan;
	if (p[1] > 0 && p[1] < 30) {
		pecahan = "<sup>1</sup>&frasl;<sub>4</sub>";
	} else if (p[1] >= 30 && p[1] < 50) {
		pecahan = "<sup>1</sup>&frasl;<sub>3</sub>";
	} else if (p[1] >= 50 && p[1] < 60) {
		pecahan = "<sup>1</sup>&frasl;<sub>2</sub>";
	} else if (p[1] >= 60 && p[1] < 75) {
		pecahan = "<sup>2</sup>&frasl;<sub>3</sub>";
	} else if (p[1] >= 75 && p[1] < 80) {
		pecahan = "<sup>3</sup>&frasl;<sub>4</sub>";
	} else if (p[1] >= 80) {
		pecahan = 1;
	} else {
		pecahan = 0;
	}
	var jadiPecahan;
	if (bulat == 0) {
		jadiPecahan = pecahan;
	} else {
		jadiPecahan = bulat + pecahan;
	}
	return jadiPecahan;
}

$(document).ready(function(){
	var iniLed = true;

	$("#panjang").focus();

	$("input[name='jenis']:radio").change(function(){
		if($(this).val() == "led") {
			$("#led").collapse("show");
			$("#bukanLed").collapse("hide");
			iniLed = true;
		} else if($(this).val() == "bukanLed") {
			$("#bukanLed").collapse("show");
			$("#led").collapse("hide");
			iniLed = false;
		}
	});

	var isKaton = false;
	$("#hitung").click(function(){
		ukuranTank();
		if(iniLed) {
			hitungLed();
			rekomendasiLed();
		} else {
			hitungBukanLed();
			rekomendasiBukanLed();
		}
		
		$("#hasilHitung").collapse("show");
		if(isKaton) {
			$('html, body').animate({ scrollTop: $("#hasilHitung").offset().top }, 1000);
		}
	});

	$("#hasilHitung").on('shown.bs.collapse', function(){
		isKaton = true;
        $('html, body').animate({ scrollTop: $("#hasilHitung").offset().top }, 1000);
    });
});