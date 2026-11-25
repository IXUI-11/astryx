// Copyright (c) Meta Platforms, Inc. and affiliates.

import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  radiusVars,
  spacingVars,
} from '@astryxdesign/core/theme/tokens.stylex';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';

const SERVICES = [
  {
    title: 'Site vitrine',
    description:
      'Un site clair et rapide pour présenter une activité, pensé pour le mobile et pour les moteurs de recherche.',
    deliverables: [
      'Maquette puis intégration responsive',
      'Formulaire de contact',
      'Bases du référencement naturel',
    ],
    stack: 'Angular · React · PHP',
  },
  {
    title: 'Application web sur mesure',
    description:
      'Un outil métier ou une plateforme avec comptes utilisateurs, base de données et interface soignée.',
    deliverables: [
      'API REST et base de données MySQL',
      'Authentification et gestion des rôles',
      'Interface front-end complète',
    ],
    stack: 'ASP.NET · React · MySQL',
  },
  {
    title: 'Hébergement et mise en ligne',
    description:
      'Déploiement sur un serveur privé, avec nom de domaine, HTTPS et sauvegardes.',
    deliverables: [
      'Configuration du serveur VPS',
      'Certificat HTTPS et nom de domaine',
      'Sauvegardes et mises à jour',
    ],
    stack: 'VPS · Linux · Proxmox',
  },
  {
    title: 'Maintenance et évolution',
    description:
      "Corrections, mises à jour et nouvelles fonctionnalités pour qu'un site existant reste fiable.",
    deliverables: [
      'Correction de bugs',
      'Mise à jour des dépendances',
      'Nouvelles fonctionnalités',
    ],
    stack: 'PHP · Angular · MySQL',
  },
];

const TECHNOLOGIES = [
  {label: 'Front-end', items: ['Angular', 'React']},
  {label: 'Back-end', items: ['ASP.NET', 'PHP']},
  {label: 'Données', items: ['MySQL']},
  {label: 'Infrastructure', items: ['VPS', 'Proxmox']},
];

const STEPS = [
  {title: 'Échange', text: 'On définit le besoin, le public et le budget.'},
  {title: 'Maquette', text: 'Vous validez la structure et le design.'},
  {
    title: 'Développement',
    text: 'Je construis le site, avec des points réguliers.',
  },
  {title: 'Mise en ligne', text: 'Déploiement, tests et prise en main.'},
];

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
  header: {
    paddingBlock: spacingVars['--spacing-4'],
  },
  section: {
    paddingBlock: 'clamp(40px, 7vw, 80px)',
  },
  list: {
    margin: 0,
    paddingInlineStart: spacingVars['--spacing-4'],
    listStyleType: 'disc',
  },
  techRow: {
    display: 'grid',
    alignItems: 'center',
    gap: spacingVars['--spacing-3'],
    gridTemplateColumns: '120px minmax(0, 1fr)',
  },
  stepNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: radiusVars['--radius-full'],
    backgroundColor: colorVars['--color-accent'],
    color: colorVars['--color-on-accent'],
  },
});

export default function Services() {
  return (
    <div {...stylex.props(styles.page)}>
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
      <Divider />

      <main {...stylex.props(styles.inner)}>
        <section {...stylex.props(styles.section)}>
          <Grid
            gap={10}
            align="center"
            columns={{minWidth: 340, max: 2, repeat: 'fit'}}>
            <VStack gap={5}>
              <HStack>
                <Badge label="Sites et applications web" />
              </HStack>
              <Heading level={1} type="display-2">
                De la conception à l'hébergement, un seul interlocuteur.
              </Heading>
              <Text type="large" color="secondary">
                Je conçois, développe et héberge des sites web et des
                applications sur mesure, pour des entreprises et des
                indépendants.
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
            <Card variant="muted" padding={6}>
              <VStack gap={4}>
                <Heading level={2}>Technologies</Heading>
                <VStack gap={3}>
                  {TECHNOLOGIES.map(group => (
                    <div key={group.label} {...stylex.props(styles.techRow)}>
                      <Text type="supporting" color="secondary">
                        {group.label}
                      </Text>
                      <HStack gap={2} wrap="wrap">
                        {group.items.map(item => (
                          <Badge key={item} label={item} />
                        ))}
                      </HStack>
                    </div>
                  ))}
                </VStack>
              </VStack>
            </Card>
          </Grid>
        </section>

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
            <Grid gap={4} columns={{minWidth: 440, max: 2, repeat: 'fit'}}>
              {SERVICES.map(service => (
                <Card key={service.title} padding={6} height="100%">
                  <VStack gap={3}>
                    <Heading level={3}>{service.title}</Heading>
                    <Text color="secondary">{service.description}</Text>
                    <ul {...stylex.props(styles.list)}>
                      {service.deliverables.map(item => (
                        <li key={item}>
                          <Text>{item}</Text>
                        </li>
                      ))}
                    </ul>
                    <Text type="supporting" weight="semibold">
                      {service.stack}
                    </Text>
                  </VStack>
                </Card>
              ))}
            </Grid>
          </VStack>
        </section>

        <Divider />

        <section id="methode" {...stylex.props(styles.section)}>
          <VStack gap={6}>
            <Heading level={2}>Méthode de travail</Heading>
            <Grid gap={6} columns={{minWidth: 220, max: 4, repeat: 'fit'}}>
              {STEPS.map((step, i) => (
                <VStack key={step.title} gap={2}>
                  <span {...stylex.props(styles.stepNumber)}>
                    <Text weight="semibold" color="inherit">
                      {i + 1}
                    </Text>
                  </span>
                  <Heading level={3}>{step.title}</Heading>
                  <Text color="secondary">{step.text}</Text>
                </VStack>
              ))}
            </Grid>
          </VStack>
        </section>

        <section id="contact" {...stylex.props(styles.section)}>
          <Card variant="muted" padding={8}>
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
