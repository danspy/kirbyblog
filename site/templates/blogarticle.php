<?php snippet('header') ?>
  	<?php if($image = $page->images()->sortBy('sort', 'asc')->first()): $backgroundimage = $image->url(); ?>
		<div class="article-image" style="background: url(<?php echo $backgroundimage; ?>) no-repeat center; background-size: cover;"></div>
	<?php else: ?>
		<div class="article-header"<?php if(($page->bgcolor()) || ($page->textcolor())) { ?> style="background-color: <?php echo $page->bgcolor(); ?>; color: <?php echo $page->textcolor(); ?>;"<?php } ?>></div>
	<?php endif; ?>

  	<main class="main" role="main">
	    <div class="row">
			<div class="article-content">
		      	<h2><?php echo $page->title()->html() ?></h2>
		      	<?php echo $page->text()->kirbytext() ?>

		      	<div class="meta-info">
		      		<?php echo $page->tags() ?>
		      	</div>
			</div>
	    </div>
  	</main>

<?php snippet('footer') ?>