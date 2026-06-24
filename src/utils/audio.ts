'use client'

class AudioEngine {
  private ctx: AudioContext | null = null
  private muted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = localStorage.getItem('rdr2_portfolio_muted')
      this.muted = storedMute === 'true'
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('rdr2_portfolio_muted', String(muted))
    }
  }

  public isMuted(): boolean {
    return this.muted
  }

  public playHover() {
    if (this.muted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      // Low frequency dull woodblock / leather click
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(140, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.05)

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.06)
    } catch (e) {
      console.warn('Audio playHover failed:', e)
    }
  }

  public playSelect() {
    if (this.muted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      // Sound 1: Low deep metal thud
      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      osc1.connect(gain1)
      gain1.connect(this.ctx.destination)

      osc1.type = 'sawtooth'
      osc1.frequency.setValueAtTime(90, now)
      osc1.frequency.linearRampToValueAtTime(40, now + 0.18)

      // High-cut filter to make it sound muffled and deep
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(180, now)
      
      osc1.disconnect(gain1)
      osc1.connect(filter)
      filter.connect(gain1)

      gain1.gain.setValueAtTime(0.4, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

      // Sound 2: High metallic hammer clink (gun-cocking trigger)
      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(this.ctx.destination)

      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(800, now)
      osc2.frequency.exponentialRampToValueAtTime(500, now + 0.04)

      gain2.gain.setValueAtTime(0.08, now)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.22)
      osc2.stop(now + 0.06)
    } catch (e) {
      console.warn('Audio playSelect failed:', e)
    }
  }

  public playBack() {
    if (this.muted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      // Paper swoosh / card slide: bandpass-filtered noise or lower pitch sine sweep
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(250, now)
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(400, now)
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.15)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

      osc.start(now)
      osc.stop(now + 0.18)
    } catch (e) {
      console.warn('Audio playBack failed:', e)
    }
  }
}

const audio = new AudioEngine()
export default audio
