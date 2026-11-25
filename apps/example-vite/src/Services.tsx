// Copyright (c) Meta Platforms, Inc. and affiliates.

import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  radiusVars,
  spacingVars,
} from '@astryxdesign/core/theme/tokens.stylex';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';

const DEPLOY_LOG = `$ git push production main
✓ Build terminé
✓ Tests passés
✓ Certificat HTTPS actif
✓ Sauvegarde planifiée à 02:00
→ Site en ligne`;

const STEPS = [
  {title: 'Échange', text: 'Besoin, public et budget.'},
  {title: 'Maquette', text: 'Structure et design validés.'},
  {title: 'Développement', text: 'Points réguliers.'},
  {title: 'Mise en ligne', text: 'Tests et prise en main.'},
];

const ROLES = [
  {name: 'Administrateur', variant: 'info'},
  {name: 'Éditeur', variant: 'neutral'},
  {name: 'Lecteur', variant: 'neutral'},
] as const;

const UPDATES = [
  {name: 'Dépendances', status: 'À jour'},
  {name: 'Correctifs de sécurité', status: 'Appliqués'},
  {name: 'Sauvegarde', status: 'Vérifiée'},
] as const;

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: colorVars['--color-background-body'],
    color: colorVars['--color-text-primary'],
  },
  inner: {
    maxWidth: 1120,
    marginInline: 'auto',
    paddingInline: 'clamp(20px, 4vw, 48px)',
  },
  hero: {
    display: 'grid',
    gap: spacingVars['--spacing-4'],
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 760px)': 'repeat(2, minmax(0, 1fr))',
    },
  },
  header: {paddingBlock: spacingVars['--spacing-4']},
  section: {paddingBlock: 'clamp(48px, 8vw, 96px)'},
  window: {
    overflow: 'hidden',
    borderRadius: radiusVars['--radius-container'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVars['--color-border'],
    backgroundColor: colorVars['--color-background-surface'],
  },
  windowBar: {
    display: 'flex',
    alignItems: 'center',
    columnGap: spacingVars['--spacing-2'],
    paddingBlock: spacingVars['--spacing-3'],
    paddingInline: spacingVars['--spacing-4'],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colorVars['--color-border'],
    backgroundColor: colorVars['--color-background-muted'],
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radiusVars['--radius-full'],
    backgroundColor: colorVars['--color-border-emphasized'],
  },
  windowBody: {padding: spacingVars['--spacing-5']},
  bar: (widthPercent: number, height: number) => ({
    width: `${widthPercent}%`,
    height,
    borderRadius: radiusVars['--radius-inner'],
    backgroundColor: colorVars['--color-background-muted'],
  }),
  barStrong: {backgroundColor: colorVars['--color-border-emphasized']},
  barAccent: {backgroundColor: colorVars['--color-accent']},
  wireTiles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: spacingVars['--spacing-2'],
  },
  tile: {
    height: 56,
    borderRadius: radiusVars['--radius-inner'],
    backgroundColor: colorVars['--color-background-muted'],
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: spacingVars['--spacing-3'],
    paddingBlock: spacingVars['--spacing-2'],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colorVars['--color-border'],
  },
  bento: {
    display: 'grid',
    gap: spacingVars['--spacing-4'],
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 900px)': 'repeat(6, minmax(0, 1fr))',
    },
  },
  span: (columns: number) => ({
    gridColumn: {
      default: 'auto',
      '@media (min-width: 900px)': `span ${columns}`,
    },
  }),
  fill: {height: '100%'},
  timeline: {
    display: 'grid',
    gap: spacingVars['--spacing-6'],
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 760px)': 'repeat(4, minmax(0, 1fr))',
    },
  },
  node: {
    width: 12,
    height: 12,
    borderRadius: radiusVars['--radius-full'],
    backgroundColor: colorVars['--color-accent'],
  },
  rule: {
    flexGrow: 1,
    height: 1,
    backgroundColor: colorVars['--color-border-emphasized'],
  },
});

function WindowChrome({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div {...stylex.props(styles.window)}>
      <div {...stylex.props(styles.windowBar)}>
        <span {...stylex.props(styles.dot)} />
        <span {...stylex.props(styles.dot)} />
        <span {...stylex.props(styles.dot)} />
        <Text type="supporting" color="secondary">
          {title}
        </Text>
      </div>
      <div {...stylex.props(styles.windowBody)}>{children}</div>
    </div>
  );
}

function ServiceCard({
  title,
  text,
  stack,
  children,
}: {
  title: string;
  text: string;
  stack: string;
  children: React.ReactNode;
}) {
  return (
    <Card padding={6} height="100%">
      <VStack gap={5} height="100%">
        <VStack gap={2}>
          <Heading level={3}>{title}</Heading>
          <Text color="secondary">{text}</Text>
        </VStack>
        <VStack gap={2}>{children}</VStack>
        <Text type="supporting" weight="semibold">
          {stack}
        </Text>
      </VStack>
    </Card>
  );
}

export default function Services() {
  return (
    <div {...stylex.props(styles.page)}>
      <div>
        <header {...stylex.props(styles.inner, styles.header)}>
          <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
            <Text weight="semibold">Développeur web full-stack</Text>
            <HStack gap={1} vAlign="center" wrap="wrap">
              <Button label="Services" variant="ghost" href="#services" />
              <Button label="Méthode" variant="ghost" href="#methode" />
              <Button label="Contact" variant="primary" href="#contact" />
            </HStack>
          </HStack>
        </header>

        <main {...stylex.props(styles.inner)}>
          <section {...stylex.props(styles.section)}>
            <VStack gap={10}>
              <VStack gap={5} maxWidth={760}>
                <HStack>
                  <Badge variant="info" label="Sites et applications web" />
                </HStack>
                <Heading level={1} type="display-1">
                  Votre site, conçu et mis en ligne de bout en bout.
                </Heading>
                <Text type="large" color="secondary">
                  Du premier échange à l'hébergement : un seul interlocuteur
                  pour concevoir, développer et déployer.
                </Text>
                <HStack gap={3} wrap="wrap">
                  <Button
                    label="Demander un devis"
                    variant="primary"
                    size="lg"
                    href="#contact"
                  />
                  <Button
                    label="Voir les services"
                    variant="secondary"
                    size="lg"
                    href="#services"
                  />
                </HStack>
              </VStack>

              <div {...stylex.props(styles.hero)}>
                <WindowChrome title="votre-site.fr">
                  <VStack gap={3}>
                    <div
                      {...stylex.props(styles.bar(38, 10), styles.barAccent)}
                    />
                    <div
                      {...stylex.props(styles.bar(80, 22), styles.barStrong)}
                    />
                    <div {...stylex.props(styles.bar(64, 8))} />
                    <div {...stylex.props(styles.bar(52, 8))} />
                    <div
                      {...stylex.props(styles.bar(26, 28), styles.barAccent)}
                    />
                    <div {...stylex.props(styles.wireTiles)}>
                      <div {...stylex.props(styles.tile)} />
                      <div {...stylex.props(styles.tile)} />
                      <div {...stylex.props(styles.tile)} />
                    </div>
                  </VStack>
                </WindowChrome>
                <CodeBlock
                  width="100%"
                  xstyle={styles.fill}
                  title="Déploiement"
                  language="bash"
                  code={DEPLOY_LOG}
                />
              </div>
              <Text type="supporting" color="secondary">
                Aperçus illustratifs : maquette d'un site et exemple de
                déploiement.
              </Text>
            </VStack>
          </section>
        </main>
      </div>

      <main {...stylex.props(styles.inner)}>
        <Divider />
        <section id="services" {...stylex.props(styles.section)}>
          <VStack gap={6}>
            <VStack gap={2}>
              <Heading level={2}>Services</Heading>
              <Text color="secondary">
                Chaque projet couvre la conception, le développement et la mise
                en ligne.
              </Text>
            </VStack>
            <div {...stylex.props(styles.bento)}>
              <div {...stylex.props(styles.span(4))}>
                <ServiceCard
                  title="Site vitrine"
                  text="Un site clair et rapide pour présenter une activité, pensé pour le mobile et les moteurs de recherche."
                  stack="Angular · React · PHP">
                  <div
                    {...stylex.props(styles.bar(70, 14), styles.barStrong)}
                  />
                  <div {...stylex.props(styles.bar(90, 8))} />
                  <div {...stylex.props(styles.bar(55, 8))} />
                </ServiceCard>
              </div>
              <div {...stylex.props(styles.span(2))}>
                <ServiceCard
                  title="Hébergement"
                  text="Serveur privé, domaine, HTTPS, sauvegardes."
                  stack="VPS · Linux · Proxmox">
                  <HStack gap={2} wrap="wrap">
                    <Badge variant="success" label="HTTPS actif" />
                    <Badge label="Sauvegarde 02:00" />
                  </HStack>
                </ServiceCard>
              </div>
              <div {...stylex.props(styles.span(2))}>
                <ServiceCard
                  title="Application sur mesure"
                  text="Comptes, rôles, base de données."
                  stack="ASP.NET · React · MySQL">
                  {ROLES.map(role => (
                    <div key={role.name} {...stylex.props(styles.row)}>
                      <Text size="sm">{role.name}</Text>
                      <Badge variant={role.variant} label="Accès" />
                    </div>
                  ))}
                </ServiceCard>
              </div>
              <div {...stylex.props(styles.span(4))}>
                <ServiceCard
                  title="Maintenance et évolution"
                  text="Corrections, mises à jour et nouvelles fonctionnalités pour qu'un site existant reste fiable."
                  stack="PHP · Angular · MySQL">
                  {UPDATES.map(update => (
                    <div key={update.name} {...stylex.props(styles.row)}>
                      <Text size="sm">{update.name}</Text>
                      <Badge variant="success" label={update.status} />
                    </div>
                  ))}
                </ServiceCard>
              </div>
            </div>
          </VStack>
        </section>

        <Divider />
        <section id="methode" {...stylex.props(styles.section)}>
          <VStack gap={6}>
            <Heading level={2}>Méthode de travail</Heading>
            <div {...stylex.props(styles.timeline)}>
              {STEPS.map(step => (
                <VStack key={step.title} gap={3}>
                  <HStack gap={2} vAlign="center">
                    <span {...stylex.props(styles.node)} />
                    <span {...stylex.props(styles.rule)} />
                  </HStack>
                  <Heading level={3}>{step.title}</Heading>
                  <Text color="secondary">{step.text}</Text>
                </VStack>
              ))}
            </div>
          </VStack>
        </section>

        <section id="contact" {...stylex.props(styles.section)}>
          <Card padding={8}>
            <HStack gap={6} vAlign="center" hAlign="between" wrap="wrap">
              <VStack gap={2}>
                <Heading level={2}>Parlons de votre projet</Heading>
                <Text color="secondary">
                  Décrivez votre besoin en quelques lignes, je vous réponds avec
                  une proposition.
                </Text>
              </VStack>
              <Button
                label="Me contacter"
                variant="primary"
                size="lg"
                href="mailto:contact@example.com"
              />
            </HStack>
          </Card>
        </section>
      </main>
    </div>
  );
}
