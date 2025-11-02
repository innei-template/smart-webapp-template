import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button/Button'
import { Checkbox } from '~/components/ui/checkbox/Checkbox'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '~/components/ui/context-menu/context-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog/Dialog'
import { Divider } from '~/components/ui/divider/Divider'
import { Input } from '~/components/ui/input/Input'
import { Label } from '~/components/ui/label/Label'
import { BasePrompt, Modal } from '~/components/ui/modal'
import { SegmentGroup, SegmentItem } from '~/components/ui/segment'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select/Select'
import { Slider } from '~/components/ui/slider/Slider'
import { Switch } from '~/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip/Tooltip'
import { useSetTheme, useThemeAtomValue } from '~/hooks/common/useDark'

import { repository } from '../../../package.json'

export const Component = () => {
  const [starCount, setStarCount] = useState(42)
  const [isStarred, setIsStarred] = useState(false)
  const [likesCount, setLikesCount] = useState(127)
  const [isLiked, setIsLiked] = useState(false)
  const [showNotifications, setShowNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(false)

  const [enableSound, setEnableSound] = useState(true)
  const [selectedTab, setSelectedTab] = useState('overview')

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const theme = useThemeAtomValue()
  const setTheme = useSetTheme()

  const handleStar = () => {
    setIsStarred(!isStarred)
    setStarCount((prev) => (isStarred ? prev - 1 : prev + 1))
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleContextAction = (_action: string) => {
    // You can add actual functionality here
  }

  const handlePromptDemo = () => {
    Modal.present(BasePrompt, {
      title: 'Delete Item',
      description:
        'This action cannot be undone. Are you sure you want to delete this item?',
      variant: 'danger',
      onConfirmText: 'Delete',
      onCancelText: 'Cancel',
      onConfirm: () => {
        toast.success('Item deleted!')
      },
      onCancel: () => {
        toast.error('Delete cancelled')
      },
    })
  }

  const themeOptions = [
    { value: 'light', icon: 'i-mingcute-sun-line', label: 'Light' },
    { value: 'dark', icon: 'i-mingcute-moon-line', label: 'Dark' },
    { value: 'system', icon: 'i-mingcute-monitor-line', label: 'System' },
  ] as const

  const features = [
    {
      icon: 'i-mingcute-lightning-line',
      title: 'Lightning Fast',
      description:
        'Built with Vite for instant dev server and optimized builds',
    },
    {
      icon: 'i-mingcute-code-line',
      title: 'Developer Experience',
      description:
        'ESLint, Prettier, Git hooks, and TypeScript configured out of the box',
    },
    {
      icon: 'i-mingcute-rocket-line',
      title: 'Production Ready',
      description:
        'Optimized builds, automatic code splitting, and modern tooling',
    },
  ]

  const techStack = [
    'Vite 5',
    'React 18',
    'TypeScript',
    'TailwindCSS 4',
    'Framer Motion',
    'React Router',
    'ESLint',
    'Prettier',
  ]

  return (
    <div className="min-h-screen transition-colors bg-background text-text">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
                <i className="i-mingcute-lightning-line w-4 h-4 text-background" />
              </div>
              <span className="font-semibold text-text">
                Smart Webapp Template
              </span>
            </div>

            <div className="flex items-center gap-1 p-1 bg-material-medium rounded-lg">
              {themeOptions.map(({ value, icon, label }) => (
                <Tooltip key={value}>
                  <TooltipTrigger>
                    <button
                      type="button"
                      onClick={() => setTheme(value)}
                      className={`
                        size-7 flex items-center justify-center rounded-md transition-all text-xs font-medium
                        ${
                          theme === value
                            ? 'bg-background text-text shadow-sm'
                            : 'text-placeholder-text hover:text-text'
                        }
                      `}
                    >
                      <i className={`${icon} w-4 h-4`} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{label}</span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-material-medium rounded-full text-sm text-text-quaternary mb-8">
              <div className="w-2 h-2 bg-green rounded-full" />
              Ready for production
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-text mb-6">
              Modern React
              <br />
              <span className="via-cyan from-accent to-accent/80 bg-gradient-to-r bg-clip-text text-transparent">
                Template
              </span>
            </h1>

            <p className="text-xl text-text-secondary mb-12 leading-relaxed">
              A production-ready template with modern tooling, best practices,
              and beautiful components. Start building immediately.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                className="bg-accent text-background hover:bg-accent/80 border-0 px-8 py-3 h-auto text-base font-medium"
                onClick={() => window.open(repository.url, '_blank')}
              >
                Get Started
                <i className="i-mingcute-arrow-right-line w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="ghost"
                className="text-placeholder-text hover:text-text px-8 py-3 h-auto text-base font-medium"
                onClick={() => window.open(repository.url, '_blank')}
              >
                <i className="i-mingcute-github-line w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-text mb-4">
              Built with modern tools
            </h2>
            <p className="text-text-secondary">
              Everything you need for a professional development experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="p-4 border border-border rounded-lg text-center hover:border-border/70 transition-colors bg-material-thin hover:bg-material-medium"
              >
                <span className="text-sm font-medium text-text">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-text-secondary">
              A complete development environment ready to go
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 border border-border rounded-xl hover:border-border/70 transition-all group bg-material-thin hover:bg-material-medium"
              >
                <div className="w-12 h-12 bg-fill rounded-lg flex items-center justify-center mb-4 group-hover:bg-fill-secondary transition-colors">
                  <i
                    className={`${feature.icon} w-6 h-6 text-text-quaternary group-hover:text-text`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="py-16 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-text mb-4">
              Interactive Components
            </h2>
            <p className="text-text-secondary">
              Try out the included UI components - from basic forms to advanced
              interactions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 border border-border rounded-xl bg-material-thin">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Button Examples */}
                <div>
                  <h3 className="font-medium text-text mb-4">
                    Button Variants
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="primary" isLoading>
                        Loading
                      </Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>
                </div>

                {/* Interactive Elements */}
                <div>
                  <h3 className="font-medium text-text mb-4">
                    Interactive Elements
                  </h3>
                  <div className="flex items-center gap-4">
                    <Tooltip>
                      <TooltipTrigger>
                        <button
                          type="button"
                          onClick={handleStar}
                          className={`
                            p-2 border border-border rounded-lg transition-all size-10
                            ${
                              isStarred
                                ? 'bg-yellow/10 border-yellow text-yellow'
                                : 'hover:border-border/70 text-placeholder-text hover:text-text bg-fill'
                            }
                          `}
                        >
                          <i
                            className={`i-mingcute-star-line w-4 h-4 ${isStarred ? 'text-yellow-400' : ''}`}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>
                          <span>{isStarred ? 'Unstar' : 'Star'}</span>{' '}
                          <span>({starCount})</span>
                        </span>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={handleLike}
                          className={`
                            p-2 border border-border rounded-lg transition-all size-10
                            ${
                              isLiked
                                ? 'bg-red/10 border-red text-red'
                                : 'hover:border-border/70 text-placeholder-text hover:text-text bg-fill'
                            }
                          `}
                        >
                          <i
                            className={`i-mingcute-heart-line w-4 h-4 ${isLiked ? 'text-red-400' : ''}`}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>
                          <span>{isLiked ? 'Unlike' : 'Like'}</span>{' '}
                          <span>({likesCount})</span>
                        </span>
                      </TooltipContent>
                    </Tooltip>

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          'https://github.com/innei-template/smart-webapp-template',
                          '_blank',
                        )
                      }
                      className="p-2 border size-10 border-border rounded-lg hover:border-border/70 text-placeholder-text hover:text-text transition-all bg-fill hover:bg-fill-secondary"
                    >
                      <i className="i-mingcute-github-line w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Components */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-medium text-text mb-4">Form Components</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Examples */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-text">
                      Input Fields
                    </h4>
                    <Input placeholder="Default input" />
                    <Input type="search" placeholder="Search input" />
                    <Input type="password" placeholder="Password input" />
                    <Input placeholder="Disabled input" disabled />
                  </div>

                  {/* Select Examples */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-text">
                      Select Dropdown
                    </h4>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                        <SelectItem value="option4" disabled>
                          Option 4 (Disabled)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Divider className="my-8" />

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Checkbox Examples */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-text">
                      Checkboxes
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox defaultChecked />
                        <span className="text-sm text-text">
                          Checked by default
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox />
                        <span className="text-sm text-text">
                          Unchecked option
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
                        <Checkbox disabled />
                        <span className="text-sm text-text">
                          Disabled checkbox
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Slider Examples */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-text">Sliders</h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-placeholder-text mb-2">
                          Primary Slider
                        </label>
                        <Slider
                          defaultValue={[50]}
                          max={100}
                          step={1}
                          variant="primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-placeholder-text mb-2">
                          Secondary Slider
                        </label>
                        <Slider
                          defaultValue={[25]}
                          max={100}
                          step={1}
                          variant="secondary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Components Demo */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-medium text-text mb-6">New Components</h3>

                <div className="space-y-8">
                  {/* Dialog and Modal Examples */}
                  <div>
                    <h4 className="text-sm font-medium text-text mb-4">
                      Dialog & Modal System
                    </h4>
                    <div className="flex gap-3 flex-wrap">
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="secondary">Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Example Dialog</DialogTitle>
                            <DialogDescription>
                              This is a customizable dialog component with
                              smooth animations.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-text-secondary">
                              Dialogs support custom animation directions and
                              spring physics for natural movement.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="primary">Confirm</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="destructive" onClick={handlePromptDemo}>
                        Show Prompt
                      </Button>
                    </div>
                  </div>

                  {/* Switch Examples */}
                  <div>
                    <h4 className="text-sm font-medium text-text mb-4">
                      Switch Components
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sound-switch">Enable Sound</Label>
                          <p className="text-sm text-text-secondary">
                            Play sound effects
                          </p>
                        </div>
                        <Switch
                          id="sound-switch"
                          checked={enableSound}
                          onCheckedChange={setEnableSound}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SegmentTab Example */}
                  <div>
                    <h4 className="text-sm font-medium text-text mb-4">
                      Segment Tab Control
                    </h4>
                    <div className="space-y-4">
                      <SegmentGroup
                        value={selectedTab}
                        onValueChanged={setSelectedTab}
                      >
                        <SegmentItem value="overview" label="Overview" />
                        <SegmentItem value="components" label="Components" />
                        <SegmentItem value="settings" label="Settings" />
                      </SegmentGroup>
                      <div className="p-4 bg-fill/30 rounded-lg border border-border">
                        <div className="text-sm text-text">
                          {selectedTab === 'overview' && (
                            <div>
                              <h5 className="font-medium mb-2">
                                Overview Content
                              </h5>
                              <p className="text-text-secondary">
                                This shows the overview section with general
                                information.
                              </p>
                            </div>
                          )}
                          {selectedTab === 'components' && (
                            <div>
                              <h5 className="font-medium mb-2">
                                Components Content
                              </h5>
                              <p className="text-text-secondary">
                                Here you can find all available UI components
                                and their usage examples.
                              </p>
                            </div>
                          )}
                          {selectedTab === 'settings' && (
                            <div>
                              <h5 className="font-medium mb-2">
                                Settings Content
                              </h5>
                              <p className="text-text-secondary">
                                Configure your application preferences and
                                options here.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Menu Demo */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-medium text-text mb-4">Context Menu</h3>
                <p className="text-sm text-placeholder-text mb-4">
                  Right-click on the card below to see the context menu in
                  action
                </p>

                <ContextMenu>
                  <ContextMenuTrigger>
                    <div className="p-6 border-2 border-dashed border-border rounded-lg hover:border-border/70 transition-colors cursor-pointer bg-fill/20 hover:bg-fill/40">
                      <div className="text-center">
                        <i className="i-mingcute-settings-3-line w-8 h-8 text-placeholder-text mx-auto mb-2" />
                        <p className="text-sm font-medium text-text">
                          Right-click me!
                        </p>
                        <p className="text-xs text-placeholder-text mt-1">
                          Try the context menu functionality
                        </p>
                      </div>
                    </div>
                  </ContextMenuTrigger>

                  <ContextMenuContent className="w-56">
                    <ContextMenuLabel>Actions</ContextMenuLabel>
                    <ContextMenuSeparator />

                    <ContextMenuItem
                      onClick={() => handleContextAction('copy')}
                    >
                      <i className="i-mingcute-copy-2-line w-4 h-4 mr-2" />
                      Copy
                    </ContextMenuItem>

                    <ContextMenuItem
                      onClick={() => handleContextAction('edit')}
                    >
                      <i className="i-mingcute-edit-line w-4 h-4 mr-2" />
                      Edit
                    </ContextMenuItem>

                    <ContextMenuItem
                      onClick={() => handleContextAction('share')}
                    >
                      <i className="i-mingcute-share-forward-line w-4 h-4 mr-2" />
                      Share
                    </ContextMenuItem>

                    <ContextMenuItem
                      onClick={() => handleContextAction('download')}
                    >
                      <i className="i-mingcute-download-2-line w-4 h-4 mr-2" />
                      Download
                    </ContextMenuItem>

                    <ContextMenuSeparator />

                    <ContextMenuLabel>Preferences</ContextMenuLabel>

                    <ContextMenuCheckboxItem
                      checked={showNotifications}
                      onCheckedChange={setShowNotifications}
                    >
                      Show notifications
                    </ContextMenuCheckboxItem>

                    <ContextMenuCheckboxItem
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    >
                      Auto-save changes
                    </ContextMenuCheckboxItem>

                    <ContextMenuSeparator />

                    <ContextMenuItem
                      onClick={() => handleContextAction('delete')}
                      className="text-red focus:text-red"
                    >
                      <i className="i-mingcute-delete-2-line w-4 h-4 mr-2" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-text mb-4">
              Quick Start
            </h2>
            <p className="text-text-secondary mb-8">
              Get up and running in less than a minute
            </p>

            <div className="p-3 bg-material-opaque rounded-xl text-left border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red rounded-full" />
                  <div className="w-3 h-3 bg-yellow rounded-full" />
                  <div className="w-3 h-3 bg-green rounded-full" />
                </div>
                <span className="text-placeholder-text text-sm font-mono">
                  Terminal
                </span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-placeholder-text"># Clone and install</div>
                <div className="text-green">pnpm install</div>
                <div className="text-placeholder-text mt-4">
                  # Start development server
                </div>
                <div className="text-green">pnpm dev</div>
                <div className="text-placeholder-text mt-4">
                  # Build for production
                </div>
                <div className="text-green">pnpm build</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
