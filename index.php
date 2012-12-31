<?php 
	$year = date('Y') + 1;
?>
<!DOCTYPE>
<html>
	<head>
		<title><?php echo $year . " Countdown!!!"; ?></title>
		<link href='http://fonts.googleapis.com/css?family=Shadows+Into+Light+Two' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Unica+One' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/style.css" type="text/css">
		<link rel="shortcut icon" href="favicon.ico">
		<!-- <META HTTP-EQUIV="REFRESH" CONTENT="60"> -->
		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-37335176-1']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	</head>
	<body>
		<div class="counter">
			<div class="title">
				<!--<h1 id="title">Time remaining to <?php echo $year; ?>:</h1>-->
				<div id="titleLetters">
					<!-- <img src="css/img/FontPNG/T.png" alt="T" id="T" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/I.png" alt="I" id="I" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/M.png" alt="M" id="M" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/E.png" alt="E" id="E" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/T.png" alt="T" id="T" class="titleLetter space"> -->
					<!-- <img src="css/img/FontPNG/O.png" alt="O" id="O" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/N.png" alt="N" id="N" class="titleLetter space"> -->
					<!-- <img src="css/img/FontPNG/E.png" alt="E" id="E" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/W.png" alt="W" id="W" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/Y.png" alt="Y" id="Y" class="titleLetter space"> -->
					<!-- <img src="css/img/FontPNG/E.png" alt="E" id="E" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/A.png" alt="A" id="A" class="titleLetter"> -->
					<!-- <img src="css/img/FontPNG/R.png" alt="R" id="R" class="titleLetter"> -->
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/T.png" alt="T" id="T" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/I.png" alt="I" id="I" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/M.png" alt="M" id="M" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/E.png" alt="E" id="E" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/T.png" alt="T" id="T" class="titleLetter space">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/O.png" alt="O" id="O" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/N.png" alt="N" id="N" class="titleLetter space">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/E.png" alt="E" id="E" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/W.png" alt="W" id="W" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/Y.png" alt="Y" id="Y" class="titleLetter space">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/E.png" alt="E" id="E" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/A.png" alt="A" id="A" class="titleLetter">
					<img src="https://dl.dropbox.com/u/98905961/NewYearCountdown/R.png" alt="R" id="R" class="titleLetter">
				</div>
			</div>
			<div class="countdownWrapper">
				<div class="clock">
					<script language="JavaScript">
						// TargetDate = "MM/DD/YYYY hh:mm AM/PM"
						TargetDate = "01/01/2013 00:00 AM";
						BackColor = "none";
						ForeColor = "none";
						CountActive = true;
						CountStepper = -1;
						LeadingZero = true;
						DisplayFormat = "%%D%% days, %%H%% hours, %%M%% minutes, %%S%% seconds";
						FinishMessage = "Have a great new year!!!!!!!!";
					</script>
					<script language="JavaScript" src="http://scripts.hashemian.com/js/countdown.js"></script>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footerWrapper">
				<p>&copy;<?php echo date('Y'); ?> New Year Countdown. By Pablo Kvitca (@pablokvitca).</p>
				<a href="http://referrals.trhou.se/pablokvitca" target="_blank"><img src="http://teamtreehouse.com/referral-badge/pablokvitca"></a>
			</div>
		</div>
	</body>
	<!-- <script>
		var target = new Date("January 01, 2013 00:00:01");
		timeOffset = target.getTimezoneOffset() * 60000;
		targetTime = target.getTime();
		targetUTC = targetTime + timeOffset;

		var today = new Date();
		todayTime = today.getTime();
		todayUTC = todayTime + timeOffset;

		refreshTime = (targetUTC - todayUTC);
		if (refreshTime > 1) {
		    setTimeout(function() { window.location.reload(true); }, refreshTime);
		}
	</script> -->
</html>