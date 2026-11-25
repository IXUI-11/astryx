// Copyright (c) Meta Platforms, Inc. and affiliates.

import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  radiusVars,
  spacingVars,
} from '@astryxdesign/core/theme/tokens.stylex';
import {Layout, LayoutContent, VStack, HStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';

type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  stack: string[];
};

const SERVICES: Service[] = [
  {
    id: 'showcase',
    title: 'Site vitrine',
    description:
      'Un site clair et rapide pour présenter une activité, avec un design adapté au mobile et aux moteurs de recherche.',
    deliverables: [
      'Maquette puis intégration responsive',
      'Formulaire de contact',
      'Bases du référencement naturel',
    ],
    stack: ['Angular', 'React', 'PHP'],
  },
  {
    id: 'webapp',
    title: 'Application web sur mesure',
    description:
      'Un outil métier ou une plateforme avec comptes utilisateurs, base de données et interface soignée.',
    deliverables: [
      'API REST et base MySQL',
      'Authentification et rôles',
      'Interface front-end complète',
    ],
    stack: ['C# ASP.NET', 'React', 'MySQL'],
  },
  {
    id: 'hosting',
    title: 'Hébergement et mise en ligne',
    description:
      'Déploiement sur un serveur privé, avec nom de domaine, HTTPS et sauvegardes.',
    deliverables: [
      'Configuration du serveur VPS',
      'Certificat HTTPS et nom de domaine',
      'Sauvegardes et mises à jour',
    ],
    stack: ['VPS', 'Linux', 'Proxmox'],
  },
  {
    id: 'maintenance',
    title: 'Maintenance et évolution',
    description:
      "Corrections, mises à jour et nouvelles fonctionnalités pour qu'un site existant reste fiable.",
    deliverables: [
      'Correction de bugs',
      'Mise à jour des dépendances',
      'Nouvelles fonctionnalités',
    ],
    stack: ['PHP', 'Angular', 'MySQL'],
  },
];

const STEPS = [
  {title: 'Échange', text: 'On définit le besoin, le public et le budget.'},
  {title: 'Maquette', text: 'Vous validez la structure et le design.'},
  {
    title: 'Développement',
    text: 'Je construis le site avec des points réguliers.',
  },
  {title: 'Mise en ligne', text: 'Déploiement, tests et prise en main.'},
];

const styles = stylex.create({
  hero: {
    paddingBlock: spacingVars['--spacing-8'],
    maxWidth: 720,
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
  list: {
    margin: 0,
    listStyleType: 'disc',
    paddingInlineStart: spacingVars['--spacing-4'],
  },
});

function ServiceCard({service}: {service: Service}) {
  return (
    <Card>
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
        <HStack gap={2} wrap="wrap">
          {service.stack.map(tech => (
            <Badge key={tech} label={tech} />
          ))}
        </HStack>
      </VStack>
    </Card>
  );
}

export default function Services() {
  return (
    <Layout height="auto" padding={6} contentWidth={1080}>
      <LayoutContent padding={6} role="main">
        <VStack gap={8}>
          <VStack gap={4} xstyle={styles.hero}>
            <Badge variant="info" label="Développeur web full-stack" />
            <Heading level={1} type="display-2">
              Des sites web qui servent votre activité
            </Heading>
            <Text type="large" color="secondary">
              Du site vitrine à l'application sur mesure, je conçois, développe
              et héberge votre projet.
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

          <VStack gap={4} id="services">
            <Heading level={2}>Services</Heading>
            <Grid gap={4} columns={{minWidth: 300, max: 2, repeat: 'fit'}}>
              {SERVICES.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </Grid>
          </VStack>

          <Divider />

          <VStack gap={4}>
            <Heading level={2}>Comment ça se passe</Heading>
            <Grid gap={4} columns={{minWidth: 220, max: 4, repeat: 'fit'}}>
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

          <Divider />

          <Card variant="muted" padding={6}>
            <VStack gap={3} id="contact">
              <Heading level={2}>Un projet en tête ?</Heading>
              <Text color="secondary">
                Décrivez votre besoin en quelques lignes, je vous réponds avec
                une proposition.
              </Text>
              <HStack>
                <Button
                  label="Me contacter"
                  variant="primary"
                  href="mailto:contact@example.com"
                />
              </HStack>
            </VStack>
          </Card>
        </VStack>
      </LayoutContent>
    </Layout>
  );
}
