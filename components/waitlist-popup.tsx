"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const MAILCHIMP_ACTION_URL =
    "https://gmail.us19.list-manage.com/subscribe/post?u=b8898b94266e53179fa3bc7ff&id=cc2cbb82cb&f_id=0015f7e3f0"
const HONEYPOT_FIELD_NAME = "b_b8898b94266e53179fa3bc7ff_cc2cbb82cb"
const TAG_ID = "4031940"
const POPUP_STORAGE_KEY = "peelboss-waitlist-seen"

const SHOW_AFTER_MS = 5000
const SUPPRESS_DAYS = 30

export function WaitlistPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const lastSeen = localStorage.getItem(POPUP_STORAGE_KEY)
        if (lastSeen) {
            const daysSince =
                (Date.now() - parseInt(lastSeen, 10)) / (1000 * 60 * 60 * 24)
            if (daysSince < SUPPRESS_DAYS) return
        }

        const timer = setTimeout(() => {
            setIsOpen(true)
        }, SHOW_AFTER_MS)

        return () => clearTimeout(timer)
    }, [])

    const markSeen = () => {
        localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString())
    }

    const handleClose = () => {
        setIsOpen(false)
        markSeen()
    }

    const handleSubmit = () => {
        markSeen()
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        🍌 Peel Boss is still ripening
                    </DialogTitle>
                    <DialogDescription className="text-base pt-2">
                        We&apos;re still building this out. Drop your email and we&apos;ll tell you the moment it&apos;s ready — plus founder pricing locked in for life if you join now.
                    </DialogDescription>
                </DialogHeader>

                {!submitted ? (
                    <>
                        <iframe
                            name="mailchimp-target"
                            style={{ display: "none" }}
                            title="Mailchimp submission target"
                            onLoad={() => {
                                if (email) {
                                    setSubmitted(true)
                                }
                            }}
                        />
                        <form
                            action={MAILCHIMP_ACTION_URL}
                            method="post"
                            target="mailchimp-target"
                            onSubmit={handleSubmit}
                            className="space-y-4 pt-2"
                        >
                            <Input
                                type="email"
                                name="EMAIL"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                            />

                            <div
                                style={{ position: "absolute", left: "-5000px" }}
                                aria-hidden="true"
                            >
                                <input
                                    type="text"
                                    name={HONEYPOT_FIELD_NAME}
                                    tabIndex={-1}
                                    defaultValue=""
                                />
                            </div>

                            <input type="hidden" name="tags" value={TAG_ID} />

                            <Button type="submit" className="w-full">
                                Tell me when it&apos;s ready
                            </Button>

                            <p className="text-xs text-muted-foreground text-center">
                                No spam. We&apos;ll only email you when the site is ready!
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="py-4 text-center space-y-3">
                        <p className="text-lg font-semibold">You&apos;re on the list 🌱</p>
                        <p className="text-sm text-muted-foreground">
                            Check your inbox for a confirmation email — click the link to
                            finish signing up.
                        </p>
                        <Button
                            onClick={handleClose}
                            variant="outline"
                            className="mt-2"
                        >
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}