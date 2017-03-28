var panjang, lebar, tinggi, substrate, putih, merah, biru, watt = 1, volAir;

function ukuranTank() {
	panjang = $("#panjang").val();
   	lebar = $("#lebar").val();
   	tinggi = $("#tinggi").val();
   	substrate = $('#substrate').val();
   	if (panjang != "" && lebar != "" && tinggi != "" && substrate != "") {
		var volume = (panjang*lebar*tinggi)/1000;
		var volSubstrate = (panjang * lebar * substrate)/1000;
		var amazonia = (volSubstrate/9).toFixed(2);
		var malang = (volSubstrate*0.6).toFixed(2);
		var silika = (volSubstrate*1.2).toFixed(2);
		volAir = (panjang * lebar * (tinggi - substrate))/1000;
		$("#ukuran").text(panjang+" x "+lebar+" x "+tinggi);
		$("#volume").text(volume+" liter");
		$("#volair").text(volAir+" liter");
		$("#filmin").text(volume*5+" l/h");
		$("#filmax").text(volume*10+" l/h");
		$("#volSubstrate").text(volSubstrate +" liter");
		$("#amazonia").html("&plusmn; "+pecahan(amazonia) +" kantong");
		$("#malang").html("&plusmn; "+ pecahan(malang) +" kg");
		$("#silika").html("&plusmn; "+ pecahan(silika) +" kg");
		dayaLed();
		if (putih != undefined || merah != undefined || biru != undefined) {
			hitungLumen();
		}
	}
}

function hitungLumen () {
	putih = $('#putih').val();
   	merah = $('#merah').val();
   	biru = $('#biru').val();
   	if (panjang != undefined && lebar != undefined && tinggi != undefined && substrate != undefined) {
   		if (panjang != "" && lebar != "" && tinggi != "" && substrate != "") {
   			if (putih != "" || merah != "" || biru != "") {
				var lumen;
				if (watt==1) {
					lumen = (putih*110)+(merah*45)+(biru*25);
				} else if (watt==3) {
					lumen = (putih*200)+(merah*90)+(biru*40);
				}
				var lumenLiter = lumen / volAir;
				$("#hasilLumen").text(lumenLiter.toFixed(2));
				if (lumenLiter>=15 && lumenLiter<=25) {
					$("#kategori").text("Low Light");
				}
				else if (lumenLiter>25 && lumenLiter<=50) {
					$("#kategori").text("Medium Light");
				}
				else if (lumenLiter>50) {
					$("#kategori").text("High Light");
				}
				else {
					$("#kategori").text("Not Enough Light");
				}
			}
		} else {
			alert("Lengkapi Spesifikasi Tank")
		}
	} else {
		alert("Masukkan Spesifikasi Tank")
	}
}

function dayaLed() {
	var daya;
	var light = $("#light").val();
	if (volAir != undefined) {
		daya = volAir*light/110;
		$("#rekomendasi").text(Math.ceil(daya) +" Watt");
	} else {
		alert("Masukkan spesifikasi tank");
	}
}

function keterangan(ini) {
	var y = document.getElementById(ini.name).className;
	for (var a = 1; a <= 3; a++) {
		document.getElementById("ket"+a).className = "fadeout";
	}
	if (y == "fadeout") {
		document.getElementById(ini.name).className = "fadein";
		document.getElementById("ket").className = "fadeout";
	}
	else {
		document.getElementById(ini.name).className = "fadeout";
		document.getElementById("ket").className = "fadein";
	}
}

function handleClick(radio) {
	watt = radio.value;
	if (putih != undefined || merah != undefined || biru != undefined) {
   		hitungLumen();
   	} else {
   		alert("Masukkan jumlah LED");
   	}
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