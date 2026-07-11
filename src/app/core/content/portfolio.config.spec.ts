import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { PORTFOLIO } from './portfolio.config';

/**
 * Guards the config-driven contract: every section reads from PORTFOLIO,
 * so broken links, missing files, or malformed entries break the whole site.
 */
describe('PORTFOLIO config', () => {
  const sectionIds = ['hero', 'about', 'journey', 'skills', 'projects', 'beyond', 'contact'];

  it('nav items point at real sections and have unique ids', () => {
    const ids = PORTFOLIO.nav.items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(sectionIds).toContain(id));
  });

  it('resume download points at a file that exists in /public', () => {
    const fileName = PORTFOLIO.identity.resume.url.replace(/^\//, '');
    const filePath = join(__dirname, '..', '..', '..', '..', 'public', fileName);
    expect(existsSync(filePath)).toBe(true);
  });

  it('social and project links are absolute and well-formed', () => {
    PORTFOLIO.identity.socials.forEach((social) => {
      expect(social.url).toMatch(/^(https:\/\/|mailto:)/);
    });

    PORTFOLIO.projects.items.forEach((project) => {
      if (project.live) {
        expect(project.live.url).toMatch(/^https:\/\//);
      }
      if (project.repository) {
        expect(project.repository.url).toMatch(/^https:\/\//);
      }
    });
  });

  it('journey role entries carry bullets and a stack; milestones may omit them', () => {
    PORTFOLIO.journey.entries.forEach((entry) => {
      if (entry.kind === 'role') {
        expect(entry.bullets.length).toBeGreaterThan(0);
        expect(entry.stack.length).toBeGreaterThan(0);
      }
      expect(entry.dateRange.length).toBeGreaterThan(0);
      expect(entry.story.length).toBeGreaterThan(0);
    });
  });

  it('hero content is complete', () => {
    expect(PORTFOLIO.identity.role.length).toBeGreaterThan(0);
    expect(PORTFOLIO.identity.ascent.length).toBe(4);
    expect(PORTFOLIO.identity.tagline.length).toBeGreaterThan(0);
    expect(PORTFOLIO.identity.proofLine.length).toBeGreaterThan(0);
  });
});
