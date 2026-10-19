/**
 * Shared scroll-reveal animation for framer-motion elements.
 *
 * Usage: <motion.section {...revealOnScroll} className="...">
 *
 * The bottom viewport margin (-15%) makes the reveal start once the element is clearly
 * on screen, not when its first few pixels (usually empty section padding) appear —
 * otherwise tall sections finish animating before their content is visible.
 */
export const revealOnScroll = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -15% 0px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};
