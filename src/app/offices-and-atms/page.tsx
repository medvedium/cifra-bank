import SiteShell from '@/components/layout/SiteShell'
import Button from '@/components/ui/Button'

export default function OfficesAndAtmsPage() {
    return (
        <SiteShell audience="retail">
            <div className="container">
                <h1>Offices and ATMs</h1>
                <Button color="primary">Оформить карту</Button>
                <Button color="secondary">
                    Офисы и банкоматы
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"></path>
                        <path d="M12 16C12 16 15 13.157 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8C11.2044 8 10.4413 8.31607 9.87868 8.87868C9.31607 9.44129 9 10.2044 9 11C9 13.157 12 16 12 16ZM12 12.5C11.6022 12.5 11.2206 12.342 10.9393 12.0607C10.658 11.7794 10.5 11.3978 10.5 11C10.5 10.6022 10.658 10.2206 10.9393 9.93934C11.2206 9.65804 11.6022 9.5 12 9.5C12.3978 9.5 12.7794 9.65804 13.0607 9.93934C13.342 10.2206 13.5 10.6022 13.5 11C13.5 11.3978 13.342 11.7794 13.0607 12.0607C12.7794 12.342 12.3978 12.5 12 12.5Z" fill="currentColor"></path>
                    </svg>
                </Button>
                <Button color="secondary" variant="text">
                    Подробнее
                </Button>
                <Button color="white" variant="contained">
                    Подробнее
                </Button>
                <Button color="primary" size="small">
                    Small
                </Button>
                <Button color="primary" disabled>
                    Disabled
                </Button>
            </div>
        </SiteShell>
    )
}
