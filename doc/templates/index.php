<?php get_header(); ?>
	<?php get_sidebar(); ?>
	<!-- start content -->
	<div id="content">
	<?php if (have_posts()) : ?>
	
		<?php while (have_posts()) : the_post(); ?>

			<div class="post" id="post-<?php the_ID(); ?>">
				<h2 class="title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h2>
				<p class="byline"><small><?php the_time('F jS, Y') ?> by <?php the_author() ?> <?php edit_post_link('Edit', ' | ', ''); ?></small></p>
				<div class="entry">
					<?php the_excerpt(); ?>
					<p class="links"><a href="<?php the_permalink() ?>" class="more">Read More</a></p>
				</div>
			</div>

		<?php endwhile; ?>

		<div class="navigation">
			<div class="alignleft"><?php next_posts_link('&laquo; Previous Entries') ?></div>
			<div class="alignright"><?php previous_posts_link('Next Entries &raquo;') ?></div>
		</div>

	<?php else : ?>

		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php include (TEMPLATEPATH . "/searchform.php"); ?>

	<?php endif; ?>

	</div>
	<!-- end content -->

	<?php include (TEMPLATEPATH . '/_sidebar2.php'); ?>

<?php get_footer(); ?>
